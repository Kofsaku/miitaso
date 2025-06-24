"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface LikeBookmarkButtonProps {
  postId: string
  initialLikes?: number
  className?: string
}

export function LikeBookmarkButton({
  postId,
  initialLikes = 0,
  className,
}: LikeBookmarkButtonProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ユーザーの既存のいいね・ブックマーク状態を取得
    fetchUserInteractions()
  }, [postId])

  const fetchUserInteractions = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${postId}/interactions`)
      if (response.ok) {
        const data = await response.json()
        setLiked(data.liked)
        setBookmarked(data.bookmarked)
        setLikesCount(data.likesCount)
      }
    } catch (error) {
      console.error("ユーザーのインタラクション状態の取得に失敗しました:", error)
    }
  }

  const handleLike = async () => {
    if (loading) return
    
    setLoading(true)
    const previousLiked = liked
    const previousCount = likesCount

    // 楽観的更新
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)

    try {
      const response = await fetch(`/api/blog/posts/${postId}/like`, {
        method: "POST",
      })

      if (!response.ok) {
        // エラーの場合は元に戻す
        setLiked(previousLiked)
        setLikesCount(previousCount)
        throw new Error("いいねの処理に失敗しました")
      }

      const data = await response.json()
      setLikesCount(data.likesCount)
    } catch (error) {
      console.error("いいねの処理に失敗しました:", error)
      // すでに楽観的更新で元に戻しているので、追加の処理は不要
    } finally {
      setLoading(false)
    }
  }

  const handleBookmark = async () => {
    if (loading) return
    
    setLoading(true)
    const previousBookmarked = bookmarked

    // 楽観的更新
    setBookmarked(!bookmarked)

    try {
      const response = await fetch(`/api/blog/posts/${postId}/bookmark`, {
        method: "POST",
      })

      if (!response.ok) {
        // エラーの場合は元に戻す
        setBookmarked(previousBookmarked)
        throw new Error("ブックマークの処理に失敗しました")
      }
    } catch (error) {
      console.error("ブックマークの処理に失敗しました:", error)
      // すでに楽観的更新で元に戻しているので、追加の処理は不要
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={loading}
        className={cn(
          "flex items-center gap-1 transition-colors",
          liked
            ? "text-red-600 hover:text-red-700"
            : "text-muted-foreground hover:text-red-600"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            liked && "fill-current"
          )}
        />
        <span className="text-sm font-medium">{likesCount}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        disabled={loading}
        className={cn(
          "flex items-center gap-1 transition-colors",
          bookmarked
            ? "text-blue-600 hover:text-blue-700"
            : "text-muted-foreground hover:text-blue-600"
        )}
      >
        <Bookmark
          className={cn(
            "h-4 w-4 transition-all",
            bookmarked && "fill-current"
          )}
        />
        <span className="text-sm font-medium sr-only">
          {bookmarked ? "ブックマーク済み" : "ブックマーク"}
        </span>
      </Button>
    </div>
  )
}