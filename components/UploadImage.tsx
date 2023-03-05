import { useState } from "react";

import { CldImage, CldUploadButton } from "next-cloudinary";

interface ImageCloudProps {}

export default function ImageCloud({}: ImageCloudProps) {
  const [uploadResults, setUploadResults] = useState();

  const uploadResultsTags =
    uploadResults?.info.detection.object_detection.data["cld-fashion"].tags ||
    [];

  const objects = [];

  const categorySet = new Set();

  Object.keys(uploadResultsTags).forEach((category) => {
    const categoryObjects = uploadResultsTags[category];
    categoryObjects.forEach((object) => {
      const boundingBox = object["bounding-box"];
      if (!categorySet.has(category)) {
        // Si la categoría no está en el conjunto
        categorySet.add(category); // Agrega la categoría al conjunto
        objects.push({ category, boundingBox }); // Agrega el objeto al arreglo
      }
    });
  });

  const colors = uploadResults?.colors;

  const colorsArray = colors?.map((color) => ({
    hex: color[0],
    percentage: color[1],
  }));

  console.log(colorsArray);
  function handleOnUpload(result, widget) {
    setUploadResults(result.info);
    widget.close();
  }
  console.log(uploadResults);

  return (
    <div className="pt-20 pb-16 text-center lg:pt-32">
      <div className="flex justify-center mt-10 gap-x-6">
        <CldUploadButton
          uploadPreset="testHackathon"
          onUpload={handleOnUpload}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-full group bg-slate-900 hover:bg-slate-700 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300"
        >
          Start Tagging Clothes
        </CldUploadButton>
      </div>
      <div>
        {uploadResults?.public_id && (
          <>
            <div className="mt-10">
              <span className="grid grid-cols-2 gap-5 mx-auto">
                <div className="grow">
                  <CldImage
                    width="1000"
                    height="1000"
                    src={uploadResults.public_id}
                    alt={uploadResults.public_id}
                    crop="thumb"
                    gravity="auto"
                    zoom="0.5"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex flex-row flex-wrap gap-10 grow">
                  {objects.map((object) => (
                    <div
                      key={`${object.category}-${object.boundingBox.join("-")}`}
                      className="flex flex-col w-3/12 justify-items-center"
                    >
                      <CldImage
                        width="200"
                        height="200"
                        src={uploadResults.public_id}
                        alt={uploadResults.public_id}
                        sizes="(max-width: 480px) 100vw, 50vw"
                        crop="crop"
                        gravity={`${object.category}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <p className="p-0 m-0">{object.category}</p>
                    </div>
                  ))}
                </div>
              </span>
            </div>

            <div className="flex flex-row mt-10 overflow-hidden rounded-lg">
              {colorsArray.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-full h-20"
                  style={{ backgroundColor: color.hex }}
                >
                  <p className="">{color.hex}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
