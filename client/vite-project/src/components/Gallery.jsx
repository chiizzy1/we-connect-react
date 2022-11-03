import { students } from "../assets"
import styles from "../style"



const Gallery = () => (
  <section id="gallery" className={`${styles.paddingY} ${styles.flexCenter} relative `}>
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="overflow-hidden h-96 w-96">
          <img src={students} alt="gallery" />
      </div>

      <div className="overflow-hidden h-96 w-96">
          <img src={students} alt="gallery" />
      </div>

      <div className="overflow-hidden h-96 w-96">
          <img src={students} alt="gallery" />
      </div>

    </div>
  </section>
)
export default Gallery