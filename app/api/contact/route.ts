import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, service, message, recaptchaToken } = await request.json();

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // reCAPTCHA verification
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHAが完了されていません' },
        { status: 400 }
      );
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA検証に失敗しました' },
        { status: 400 }
      );
    }

    // reCAPTCHA v3: スコアチェック (0.5以上を人間と判定)
    if (recaptchaResult.score < 0.5) {
      return NextResponse.json(
        { error: 'セキュリティチェックに失敗しました。再度お試しください。' },
        { status: 400 }
      );
    }

    // SMTPトランスポーターの設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // フォームが実際に送ってきた項目だけを描画する。
    // 会社名・電話番号はどのフォームも収集していないため出力しない。
    // service（ご相談内容）は japan-property LP のみ送信するため、値がある時だけ表示する。
    const detailsText = [
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      ...(service ? [`ご相談内容: ${service}`] : []),
      `お問い合わせ内容:\n${message}`,
    ].join('\n');

    const detailsHtml = [
      `<p><strong>お名前:</strong> ${name}</p>`,
      `<p><strong>メールアドレス:</strong> ${email}</p>`,
      ...(service ? [`<p><strong>ご相談内容:</strong> ${service}</p>`] : []),
      `<p><strong>お問い合わせ内容:</strong></p>`,
      `<p>${message.replace(/\n/g, '<br>')}</p>`,
    ].join('\n');

    // 担当者へのメール
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `【お問い合わせ】${name}様より`,
      text: detailsText,
      html: `<h2>お問い合わせ内容</h2>\n${detailsHtml}`,
    };

    // 自動返信メール
    const autoReplyMailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: '【miitaso】お問い合わせありがとうございます',
      text: `
${name} 様

この度は、miitasoにお問い合わせいただき、誠にありがとうございます。
お問い合わせ内容を確認させていただきました。

以下の内容で承りました：
--------------------------------------------------
${detailsText}
--------------------------------------------------

担当者より3日以内にご連絡させていただきます。
今しばらくお待ちくださいませ。

ご不明な点がございましたら、お気軽にお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社miitaso
〒104-0061 東京都中央区銀座1丁目12番4号N&E BLD.6F
TEL: 090-6266-0207
Email: info@miitaso.com
URL: https://miitaso.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `,
      html: `
<div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
  <h2 style="color: #333; margin-bottom: 20px;">${name} 様</h2>
  
  <p style="margin-bottom: 20px;">
    この度は、miitasoにお問い合わせいただき、誠にありがとうございます。<br>
    お問い合わせ内容を確認させていただきました。
  </p>

  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="color: #333; margin-bottom: 15px;">お問い合わせ内容</h3>
    ${detailsHtml}
  </div>

  <p style="margin-bottom: 20px;">
    担当者より3日以内にご連絡させていただきます。<br>
    今しばらくお待ちくださいませ。
  </p>

  <p style="margin-bottom: 20px;">
    ご不明な点がございましたら、お気軽にお問い合わせください。
  </p>

  <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #666;">
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>株式会社miitaso</p>
    <p>〒104-0061 東京都中央区銀座1丁目12番4号N&E BLD.6F</p>
    <p>Email: info@miitaso.com</p>
    <p>URL: https://miitaso.com</p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
  </div>
</div>
      `,
    };

    // メール送信
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyMailOptions)
    ]);

    return NextResponse.json({ message: 'お問い合わせを受け付けました' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
} 