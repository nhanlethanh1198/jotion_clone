"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  console.log({
    isAuthenticated,
    isLoading
  })

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold">
        Nơi ý tưởng, tài liệu và kế hoạch của bạn được note một cách dễ dàng. 
        <br />
        Xin chào bạn đến với <span className="underline">Nôtion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Nôtion là nơi các không gian làm việc của bạn được kết nối <br />
        tốt hơn, nhanh hơn và thông minh hơn.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Vào Nôtion ngay thôi!
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Đăng nhập nè!
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}