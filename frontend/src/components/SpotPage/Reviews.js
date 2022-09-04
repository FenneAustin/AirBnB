import './Review.css'
import Review from './Review';


const Reviews = (props) => {
  const userId = props.userId
  const reviews = props.reviews


  return (
    <>
      {reviews ?
      (reviews.map((review) => {
        return (
          <Review review={review} userId={userId} />
        );
      })
      ) : null

      }

    </>
  )

}


export default Reviews;
