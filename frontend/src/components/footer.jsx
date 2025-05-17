import '../styles/App.css';
import '../styles/footer.css';

export default function FooterBar() {
    return (
        <div className="mobile_social_container">
          <div className="social_icon linkedin_icon">
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.290323 15H3.19355V4.59375H0.290323V15ZM1.74194 0C0.774193 0 0 0.75 0 1.6875C0 2.625 0.774193 3.375 1.74194 3.375C2.70968 3.375 3.48387 2.625 3.48387 1.6875C3.48387 0.75 2.70968 0 1.74194 0ZM8.12903 6.1875V4.59375H5.22581V15H8.12903V9.65625C8.12903 6.65625 12.0968 6.46875 12.0968 9.65625V15H15V8.625C15 3.5625 9.48387 3.75 8.12903 6.1875Z"
                fill="#38BDF8"
              />
            </svg>
          </div>
          <div className="social_icon x_icon">
            <svg
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 19L12.1787 7.92646L12.1921 7.93682L19.2441 0H16.8875L11.1427 6.46L6.5807 0H0.400178L7.70209 10.3386L7.7012 10.3377L0 19H2.3566L8.74344 11.8128L13.8195 19H20ZM5.64695 1.72727L16.6207 17.2727H14.7532L3.77056 1.72727H5.64695Z"
                fill="#38BDF8"
              />
            </svg>
          </div>
          <div className="social_icon datacamp_icon">
            <svg
              viewBox="0 0 14 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 18L6.76923 13.7463V5.94146L1 2V11.561L13 8.75122"
                stroke="#38BDF8"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
    )
}