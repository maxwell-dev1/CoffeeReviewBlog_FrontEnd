'use client';
import { useJwtContext } from "../../../components/JwtContext"

export default function testPage() {
    const {jwt} = useJwtContext();
    console.log(jwt)
    return (<div>
        <h1>Welcome to the Home Page.</h1>
        </div>)
  }