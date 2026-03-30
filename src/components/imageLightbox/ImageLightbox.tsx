"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import style from "./imageLightbox.module.css"

// Extend the ImageProps from next/image
interface ImageLightboxProps extends React.ComponentProps<typeof Image> {
  // Add any additional props specific to the lightbox
  lightboxOptions?: {
    downloadable?: boolean
  }
}

export default function ImageLightbox({
  src,
  alt = "",
  width,
  height,
  className = "",
  lightboxOptions = { downloadable: true },
  ...imageProps
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = () => setIsOpen(false)

  // Handle click on the backdrop (outside the image)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox()
    }
  }

  // Handle download
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const link = document.createElement("a")
    link.href = typeof src === "string" ? src : ""
    link.download = alt || "image"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Ensure we have valid dimensions for the Image component
  const imageDimensions = {
    width: width || 500,
    height: height || 300,
  }

  // layoutKey должен быть одинаковым для одного и того же src, чтобы анимация работала всегда
  // Лучше всего использовать сам src как часть ключа (если src уникален для каждой картинки)
 

  return (
    <>
      <motion.div className={`z-10`} style={{ width, height }}>
        <motion.div
          layoutId="main-lightbox-image"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 310 }}
          className="cursor-pointer w-full h-full "
          onClick={openLightbox}
          style={{ width, height }}
        >
          <Image
            src={src || "/no-cover.jpg"}
            alt={alt}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className={`object-cover  w-full h-full  ${className} `}
            {...imageProps}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative max-w-[100vw] max-h-screen">
              <motion.img
                layoutId="main-lightbox-image"
                src={typeof src === "string" ? src : ""}
                alt={alt}
                className="relative rounded-lg max-w-full max-h-[80vh] object-contain"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ y: { type: "spring", damping: 10, stiffness: 300 } }}
                className="fixed right-2 top-2 flex flex-col-reverse items-center justify-center gap-4 mt-4"
              >
                {lightboxOptions.downloadable && (
                  <motion.button
                    className={`p-3 rounded-full ${style.buttonColor} transition-colors`}
                    onClick={handleDownload}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Download image"
                  >
                    <Download size={24} />
                  </motion.button>
                )}

                <motion.button
                  className={`p-3 rounded-full ${style.buttonColor} transition-colors`}
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
