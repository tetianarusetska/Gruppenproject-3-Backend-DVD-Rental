import Content from './Content.tsx'

export default function Footer() {
  return (
    <div 
        className='relative h-200'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}     //clipPath schneidet das Bild von unten nach oben weg
    >
        <div className='relative h-[calc(100vh+800px)] top-[-100vh]'>
            <div className='h-200 sticky top-[calc(100vh-800px)]'>
                <Content />
            </div>
        </div>
    </div>
  )
}