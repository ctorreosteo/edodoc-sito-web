import React, { useState } from 'react'
import { Play } from 'lucide-react'

// YouTube si carica solo al click: pagina più leggera e nessuna richiesta a Google prima del consenso implicito
const VideoFacade = ({ id, title, poster }) => {
  const [on, setOn] = useState(false)
  return (
    <div className="video">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setOn(true)} aria-label={`Guarda il video: ${title}`}>
          {poster && (
            <>
              <img src={poster} alt="" className="video__blur" />
              <img src={poster} alt="" className="video__img" />
            </>
          )}
          <span className="video__play">
            <Play size={26} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

export default VideoFacade
