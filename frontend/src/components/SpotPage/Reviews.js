import './Review.css'
import {useEffect, useState} from 'react'
import AddReviewModal from './AddReviewModal'
import {useSelector} from 'react-redux'
import Review from './Review';


const Reviews = (props) => {
  const userId = props.userId
  const reviews = props.reviews

  const sessionUser = useSelector((state) => state.session.user);
  // const reviews = useSelector((state) => state.review)

  const [hasReview, setHasReview] = useState(false);


  const handleReviewUpdate = () => {
    setHasReview(true)
  }



  useEffect(() => {
      setHasReview(false)
      if (reviews) {
        reviews.forEach((review) => {
          console.log('wtf')
          if (review.userId === userId) {
            handleReviewUpdate();
          }
        });
      }
  },[reviews])



  return (
    <>
      {reviews &&

      (reviews.map((review) => {
        return (
          <Review review={review} userId={userId} />
        );
      })
      )
      }

       { !hasReview && sessionUser  ? <AddReviewModal reviews={reviews} userId={userId}/> : null }
    </>
  )

}


export default Reviews;
