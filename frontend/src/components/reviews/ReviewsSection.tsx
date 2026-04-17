import ReviewAll from "@/components/reviews/ReviewAll"
import {getActiveReviewsHeroContent, getReviewCards} from "@/features/marketing/reviews/api";


export default async function(){

    const ReviewHeroContent = await getActiveReviewsHeroContent();
    const ReviewCards = await getReviewCards();


    return (
        <ReviewAll reviews = {ReviewCards} heroContent={ReviewHeroContent}/>

    )

}