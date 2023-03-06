import { useState } from "react"
import { CldImage, CldUploadButton } from "next-cloudinary"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
export default function ImageCloud({}: ImageCloudProps) {
  const [uploadResults, setUploadResults] = useState()

  const uploadResultsTags =
    uploadResults?.info.detection.object_detection.data["cld-fashion"].tags ||
    []

  const objects = []

  const categorySet = new Set()

  Object.keys(uploadResultsTags).forEach((category) => {
    const categoryObjects = uploadResultsTags[category]
    categoryObjects.forEach((object) => {
      const boundingBox = object["bounding-box"]
      if (!categorySet.has(category)) {
        // Si la categoría no está en el conjunto
        categorySet.add(category) // Agrega la categoría al conjunto
        objects.push({ category, boundingBox }) // Agrega el objeto al arreglo
      }
    })
  })

  const colors = uploadResults?.colors

  const colorsArray = colors?.map((color) => ({
    hex: color[0],
    percentage: color[1],
  }))

  console.log(colorsArray)
  function handleOnUpload(result, widget) {
    setUploadResults(result.info)
    widget.close()
  }
  console.log(uploadResults)

  return (
    <>
      <div className="px-6 pt-24 sm:pt-32 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base font-semibold leading-7 text-amber-600">
            Upload image to add to your wardrobe
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Add Tagged Clothes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Add clothes to your wardrobe and start creating your outfits
          </p>
          <div className="flex items-center justify-center mt-6 gap-x-6">
            <CldUploadButton
              uploadPreset="testHackathon"
              onUpload={handleOnUpload}
              className={buttonVariants({
                size: "sm",
                variant: "default",
              })}
            >
              Upload image
            </CldUploadButton>
            <Link
              href="/gallery"
              className={buttonVariants({
                size: "sm",
                variant: "outline",
              })}
            >
              or go to gallery
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 gap-8 px-6 mx-auto mt-16 text-sm leading-6 max-w-7xl text-zinc-900 sm:mt-20">
        <div className="space-y-8 xl:contents xl:space-y-0">
          {uploadResults?.public_id && (
            <>
              <span className="grid grid-cols-2 gap-4 ">
                <figure className="overflow-hidden bg-white shadow-lg rounded-2xl ring-1 ring-zinc-900/5">
                  <CldImage
                    width="1000"
                    height="1000"
                    src={uploadResults.public_id}
                    alt={uploadResults.public_id}
                    crop="thumb"
                    gravity="auto"
                    zoom="0.5"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="grid grid-cols-2 gap-4">
                  {objects.map((object) => (
                    <figure
                      key={`${object.category}-${object.boundingBox.join("-")}`}
                      className="relative flex flex-col overflow-hidden bg-white shadow-lg grow justify-items-center rounded-2xl ring-1 ring-zinc-900/5"
                    >
                      <CldImage
                        width="200"
                        height="200"
                        src={uploadResults.public_id}
                        alt={uploadResults.public_id}
                        sizes="(max-width: 480px) 100vw, 50vw"
                        crop="crop"
                        gravity={`${object.category}`}
                        className="object-cover w-full h-full"
                      />

                      <figcaption className="absolute bottom-2 left-2">
                        <div>
                          <div className="p-2 capitalize transition rounded-md bg-white/40 text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/30 dark:text-white dark:backdrop-blur">
                            {object.category}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </span>

              <div className="grid grid-cols-5 gap-4">
                {colorsArray.map((color, index) => (
                  <figure
                    key={index}
                    className="relative flex flex-col overflow-hidden shadow-lg grow justify-items-center rounded-2xl ring-1 ring-zinc-900/5"
                    style={{ backgroundColor: color.hex }}
                  >
                    <figcaption className="absolute bottom-2 left-2">
                      <p className="p-2 capitalize transition rounded-md bg-white/40 text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/30 dark:text-white dark:backdrop-blur">
                        {color.hex}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
