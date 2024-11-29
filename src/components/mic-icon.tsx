export default function Icon({ className }: { className?: string }) {
  return (
    <svg width="29" height="28" viewBox="0 0 29 28" className={className}>
      <defs>
        <path
          id="mic-path260"
          d="M9.333 18.667A4.68 4.68 0 0 0 14 14V4.667A4.68 4.68 0 0 0 9.333 0a4.68 4.68 0 0 0-4.666 4.667V14a4.68 4.68 0 0 0 4.666 4.667zM7 4.667a2.34 2.34 0 0 1 2.333-2.334 2.34 2.34 0 0 1 2.334 2.334V14a2.34 2.34 0 0 1-2.334 2.333A2.34 2.34 0 0 1 7 14V4.667zm11.667 7V14c0 4.783-3.617 8.633-8.167 9.217v2.45H14c.7 0 1.167.466 1.167 1.166S14.7 28 14 28H4.667c-.7 0-1.167-.467-1.167-1.167s.467-1.166 1.167-1.166h3.5v-2.45C3.617 22.633 0 18.667 0 14v-2.333c0-.7.467-1.167 1.167-1.167s1.166.467 1.166 1.167V14c0 3.85 3.15 7 7 7s7-3.15 7-7v-2.333c0-.7.467-1.167 1.167-1.167s1.167.467 1.167 1.167z"
        ></path>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(5)">
        <mask id="mic-mask260" fill="#fff">
          <use xlinkHref="#mic-path260"></use>
        </mask>
        <use xlinkHref="#mic-path260"></use>
        <g fill="#FF4F5E" mask="url(#mic-mask260)">
          <path d="M-5 0h28v28H-5z"></path>
        </g>
      </g>
    </svg>
  )
}
