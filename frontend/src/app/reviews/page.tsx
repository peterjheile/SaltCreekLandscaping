import BackgroundGradient from "@/components/ui/background-gradient";
import { ReviewCard } from "@/components/ui/review-card"
import TestimonySection from "@/components/home/TestimonySection";

export default function ReviewPage(){


    return (
        <div className = "relative w-screen min-h-[calc(100vh-5rem)]">
            <BackgroundGradient/>
            <TestimonySection/>
        </div>
    )

}