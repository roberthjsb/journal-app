import { cleanup, render,screen } from "@testing-library/react"
import { AuthLayout } from "../../../auth/Pages/authLayout"

describe('first', () => { 
    afterEach(()=>cleanup())
    test('should first', () => { 
        const title="esto es un test"
        const content="contenido test"
        render(<AuthLayout title={title}><h1>{content}</h1></AuthLayout>)
        expect(screen.getByText(title)).toBeDefined()
        expect(screen.getByText(content)).toBeDefined()

     })
 })