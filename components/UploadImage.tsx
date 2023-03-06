import { useState } from "react"
import { CldImage, CldUploadButton } from "next-cloudinary"

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
      <div className="flex justify-center mt-4 gap-x-6">
        <CldUploadButton
          uploadPreset="testHackathon"
          onUpload={handleOnUpload}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-full group bg-zinc-900 hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:bg-zinc-800 active:text-zinc-300"
        >
          Add Clothes to your Wardrobe
        </CldUploadButton>
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
