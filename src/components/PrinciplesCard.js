import React from 'react'
import styles from '../css/principles.module.css'

export default function PrinciplesCard({ cardData }) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <h2 style={{ color: cardData.titleColor }}>{cardData.title}</h2>
        <h3>{cardData.description}</h3>
      </div>
      <div className={styles.image}>
        <img src={cardData.image} alt={cardData.alt} />
      </div>
    </div>
  )
}

// export default function PrinciplesCards({ cardsData }) {
//   return (
//     <div>
//       {cardsData.map(
//         ({ title, titleColor, description, image, alt }, index) => (
//           <div key={index} className={styles.card}>
//             <div className={styles.text}>
//               <h2 style={{ color: titleColor }}>{title}</h2>
//               <h3>{description}</h3>
//             </div>
//             <div className={styles.image}>
//               <img src={image} alt={alt} />
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   )
// }
