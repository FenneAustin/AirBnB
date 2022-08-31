import './Review.css'

const Reviews = (props) => {

  const reviews = props.reviews

  return (
    <>
      {console.log(reviews)}
      {reviews && (reviews.map((review) => {
        return (
          <div key={review.id}>
            <h6 className="name">
              {review.user ? review.user.firstName : null}{" "}
              {review.user ? review.user.lastName : null}
            </h6>
            <h6 className="stars">
              {review.stars ? review.stars : null} stars
            </h6>
            <h6 className="review-date">
              {review.updatedAt ? review.updateAt : null}
            </h6>
            <h2 className="review">{review.review ? review.review : null}</h2>
          </div>
        );
      }))}
    </>
  )

}


export default Reviews;
