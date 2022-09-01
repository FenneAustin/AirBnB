import './Review.css'
import {useEffect, useState} from 'react'
import AddReviewModal from './AddReviewModal'
import {useSelector} from 'react-redux'

const Reviews = (props) => {
  const userId = props.userId
  const reviews = props.reviews

  const sessionUser = useSelector((state) => state.session.user);
  const [editing, setEditing] = useState(false)
  const [hasReview, setHasReview] = useState(false);

  const handleEdit = (e) =>{
    e.preventDefault();
    setEditing(true)
  }

  const handleReviewUpdate = () => {
    setHasReview(true)
  }



  useEffect(() => {
      if (reviews) {
        reviews.forEach((review) => {
          if (review.userId === userId) {
            handleReviewUpdate();
          }
        });
      }
  },[])


  return (
    <>
      {reviews &&

      (reviews.map((review) => {

        return (
          <div key={review.id}>
            <h6 className="name">
              {review.User.firstName ? review.User.firstName : null}{" "}
              {review.User.lastName ? review.User.lastName : null}
            </h6>
            <h6 className="stars">
              {review.stars ? review.stars : null} stars
            </h6>
            <h6 className="review-date">
              {review.updatedAt ? review.updateAt : null}
            </h6>
            {review.userId === userId ? <button>edit</button> : null}
            <h2 className="review">{review.review ? review.review : null}</h2>
          </div>
        );
      })
      )

      }
       { sessionUser && !hasReview ? <AddReviewModal reviews={reviews} userId={userId}/> : null }
    </>
  )

}


export default Reviews;
