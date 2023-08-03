'use client'
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';

export default function testPage() {
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();

  console.log('hello');
  console.log('Value of logGood:', logGood);
  console.log("value of active user: " + activeUser)

    return (
    
     
    <div className='testPage'>
      <div className='testPageContent'>
        <h1>Hello, Next.js!</h1>
      </div>
    </div>
    )
    
  }