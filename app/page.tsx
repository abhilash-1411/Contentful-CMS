import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const url=`${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/master/entries?
access_token=${process.env.ACCESS_TOKEN}&content_type=blog`


export default async function Home() {
  const response = await fetch(url);
  const data = await response.json()
  // console.log("Length:",data.items.length)
  return (
   <main>
    {
     data.items.map((blog:any,index:number)=>{
      const image = data.includes.Asset.find((asset:any)=>
        asset.sys.id===blog.fields.image.sys.id
    )
    const authorEntry = data.includes.Entry.find((entry:any)=>
        entry.sys.id===blog.fields.author.sys.id)

    const authorImage = data.includes.Asset.find((auth:any)=>
         auth.sys.id===authorEntry.fields.authorImage.sys.id
    )
      // console.log(image.fields.file.url);
      // console.log("Author",authorEntry)
      // console.log("Image",authorImage)

      return(
      <div key={index} className='px-4 mx-auto'>
        <h1 className="text-3xl font-bold py-4">{blog.fields.title}</h1>
        <div
         className='py-4 '>{documentToReactComponents(blog.fields.body)}
        </div>
        
        <img 
        src={`https:`+image.fields.file.url} width={500} height={500} alt="blogimage"/>
        <div className='flex gap-2 mt-10'>
          <img src={authorImage.fields.file.url} width={500} height={500} alt="authorImage " className='h-16
          w-16 rounded-full object-cover'/>
              <h4>{authorEntry.fields.authorName}</h4>
        </div>
       
        
      </div>
     )}
    )}
  
   
   </main>
  );
}
