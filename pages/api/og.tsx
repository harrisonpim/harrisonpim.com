import Image from 'next/image'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// fetch inter from google fonts as an array buffer
const font = fetch(
  new URL('../../public/Inter-Black.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const emoji = searchParams.get('emoji')
  const fontData = await font

  return new ImageResponse(
    (
      <div tw="h-full w-full bg-[#343434] flex flex-row justify-center items-center text-white text-6xl px-10 py-10">
        <img
          tw="w-1/3 rounded-full m-6 shadow-xl mr-10"
          src="https://github.com/harrisonpim.png"
          alt="harrisonpim"
        />
        <h1 tw="w-2/3 uppercase">{title}</h1>
        <div tw="absolute top-100 left-75 bg-[#EEEEEE] rounded-full p-7 shadow-xl">
          {emoji}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'blobmoji',
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
