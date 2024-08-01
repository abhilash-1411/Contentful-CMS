import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const url=`${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/master/entries?
access_token=${process.env.ACCESS_TOKEN}`
console.log(url)
export default async function Home() {
  const response = await fetch(url);
  const data = await response.json()
  return (
   <main>
    {
     data.items.map((a:any,index:number)=>(
      <div key={index}>
        <h1 className="txt-3xl font-bold px-24">{a.fields.title}</h1>
        <div className='py-4 px-24 pt-4'>{documentToReactComponents(a.fields.body)}</div>
        {/* <Image/> */}
      </div>
     ))
    }
   </main>
  );
}
