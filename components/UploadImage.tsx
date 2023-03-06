import { useState } from "react"
import { CldImage, CldUploadButton } from "next-cloudinary"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface ImageCloudProps {}

export default function ImageCloud({}: ImageCloudProps) {
  const [uploadResults, setUploadResults] = useState<any>()

  const uploadResultsTags =
    uploadResults?.info.detection.object_detection.data["cld-fashion"].tags ||
    []

  const objects: { category: string; boundingBox: any }[] = []

  const categorySet = new Set<string>()

  Object.keys(uploadResultsTags).forEach((category) => {
    const categoryObjects = uploadResultsTags[category]
    categoryObjects.forEach((object: any) => {
      const boundingBox = object["bounding-box"]
      if (!categorySet.has(category)) {
        // Si la categoría no está en el conjunto
        categorySet.add(category) // Agrega la categoría al conjunto
        objects.push({ category, boundingBox }) // Agrega el objeto al arreglo
      }
    })
  })

  const colors = uploadResults?.colors

  const colorsArray = colors?.map((color: any) => ({
    hex: color[0],
    percentage: color[1],
  }))

  function handleOnUpload(result: any, widget: any) {
    setUploadResults(result.info)
    widget.close()
  }

  return (
    <>
      <div className="px-6 pt-24 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-amber-600">
            Upload image to add to your wardrobe
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Add Tagged Clothes
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Add clothes to your wardrobe and start creating your outfits
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <div
              className={buttonVariants({
                size: "sm",
                variant: "default",
              })}
            >
              <CldUploadButton
                uploadPreset="testHackathon"
                onUpload={handleOnUpload}
              >
                Upload image
              </CldUploadButton>
            </div>
            or
            <Link
              href="/gallery"
              className={buttonVariants({
                size: "sm",
                variant: "outline",
              })}
            >
              Go to gallery
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 grid-rows-2 gap-8 px-6 text-sm leading-6 text-zinc-900 sm:mt-20">
        <div className="space-y-8 xl:contents xl:space-y-0">
          {uploadResults?.public_id && (
            <>
              <span className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <figure className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-zinc-900/5">
                  <CldImage
                    width="1000"
                    height="1000"
                    src={uploadResults.public_id}
                    alt={uploadResults.public_id}
                    crop="crop"
                    gravity="auto"
                    zoom="0.5"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="grid grid-cols-2 gap-4 ">
                  {objects.map((object) => (
                    <figure
                      key={object.category}
                      className="relative flex grow flex-col justify-items-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-zinc-900/5"
                    >
                      <CldImage
                        width="400"
                        height="400"
                        crop="thumb"
                        zoom="0.9"
                        gravity={`${object.category}`}
                        src={uploadResults.public_id}
                        alt={uploadResults.public_id}
                      />

                      <figcaption className="absolute bottom-2 left-2">
                        <div>
                          <div className="rounded-md bg-white/40 p-2 capitalize text-zinc-900 backdrop-blur-sm transition dark:bg-zinc-900/30 dark:text-white dark:backdrop-blur">
                            {object.category}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </span>

              <div className="grid h-20 grid-cols-3 place-items-stretch gap-5 md:grid-cols-5">
                {colorsArray.map((color, index) => (
                  <figure
                    key={index}
                    className="relative h-20 justify-items-center overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-900/5"
                    style={{ backgroundColor: color.hex }}
                  >
                    <figcaption className="absolute bottom-2 left-2">
                      <p className="rounded-md bg-white/40 p-2 capitalize text-zinc-900 backdrop-blur-sm transition dark:bg-zinc-900/30 dark:text-white dark:backdrop-blur">
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
