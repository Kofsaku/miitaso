"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import { MessageSquare, Reply, ThumbsUp, Flag } from "lucide-react"

interface Comment {
  id: string
  content: string
  createdAt: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  likes: number
  author: {
    name: string
    email: string
  }
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error("コメントの取得に失敗しました:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
        }),
      })

      if (response.ok) {
        setNewComment("")
        await fetchComments()
      } else {
        const error = await response.json()
        setError(error.message || "コメントの投稿に失敗しました")
      }
    } catch (error) {
      setError("コメントの投稿に失敗しました")
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyContent,
          parentId,
        }),
      })

      if (response.ok) {
        setReplyContent("")
        setReplyTo(null)
        await fetchComments()
      } else {
        const error = await response.json()
        setError(error.message || "返信の投稿に失敗しました")
      }
    } catch (error) {
      setError("返信の投稿に失敗しました")
    } finally {
      setSubmitting(false)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/blog/comments/${commentId}/like`, {
        method: "POST",
      })

      if (response.ok) {
        await fetchComments()
      }
    } catch (error) {
      console.error("いいねに失敗しました:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return null // 承認済みの場合はバッジを表示しない
      case "PENDING":
        return <Badge variant="outline" className="text-yellow-600">承認待ち</Badge>
      case "REJECTED":
        return <Badge variant="destructive">却下</Badge>
      default:
        return null
    }
  }

  const approvedComments = comments.filter(comment => comment.status === "APPROVED")

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">コメント</h3>
        <div className="text-center py-8">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-xl font-semibold">
          コメント ({approvedComments.length})
        </h3>
      </div>

      {/* コメント投稿フォーム */}
      <Card className="mb-8">
        <CardHeader>
          <h4 className="font-medium">コメントを投稿</h4>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを入力してください..."
              rows={4}
              required
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={submitting}>
              {submitting ? "投稿中..." : "コメントを投稿"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* コメント一覧 */}
      <div className="space-y-6">
        {approvedComments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            まだコメントがありません。最初のコメントを投稿してみませんか？
          </div>
        ) : (
          approvedComments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author.name}`} />
                    <AvatarFallback>
                      {comment.author.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{comment.author.name}</p>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </span>
                      {getStatusBadge(comment.status)}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(comment.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        返信
                      </Button>
                    </div>

                    {/* 返信フォーム */}
                    {replyTo === comment.id && (
                      <div className="mt-4 space-y-3">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="返信を入力してください..."
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={submitting}
                          >
                            {submitting ? "投稿中..." : "返信を投稿"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyTo(null)
                              setReplyContent("")
                            }}
                          >
                            キャンセル
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* 返信一覧 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-muted space-y-4">
                        {comment.replies
                          .filter(reply => reply.status === "APPROVED")
                          .map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${reply.author.name}`} />
                                <AvatarFallback className="text-xs">
                                  {reply.author.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{reply.author.name}</p>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(reply.createdAt), {
                                      addSuffix: true,
                                      locale: ja,
                                    })}
                                  </span>
                                  {getStatusBadge(reply.status)}
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                  {reply.content}
                                </p>
                                <div className="flex items-center gap-4 pt-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLikeComment(reply.id)}
                                    className="text-muted-foreground hover:text-foreground h-8"
                                  >
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {reply.likes}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}