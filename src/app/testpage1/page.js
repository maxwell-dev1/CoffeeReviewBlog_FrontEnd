'use client'
import { useLogGood } from '../../../components/LogGoodContext';


export default function testPage() {
  const { logGood } = useLogGood();

  console.log('hello');
  console.log('Value of logGood:', logGood);

    return (
    
     
    <div className='testPage'>
      <div className='testPageContent'>
        <h1>Hello, Next.js!</h1>
      </div>
    </div>
    )
    
  }