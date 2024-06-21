import {useState} from 'react'
import {cn} from '../lib/utils'
import axios from 'axios'

export default function HeroAction() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsChecked(true)

    const sendData = async () => {
      const data = {
        email,
      }

      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx2tMsuPmmtzlUCs0BcfBBDL42yY3A7rNorD7IE5rNZ-mEOK779yyUerfzbGS8MDm4H/exec'

      try {
        const response = await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Failed to send data')
        }

        const responseData = await response.json()
        console.log('Response Data:', responseData)

        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
        }, 2000)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    sendData()
  }

  const formElemStyles = {
    default: 'w-fit sm:w-full text-lg font-book px-5 py-2.5 rounded-[10px] border-2 duration-200',
    solid: 'bg-black text-white border-transparent hover:opacity-85 ',
    outline: 'bg-transparent text-black placeholder:text-black border-2 border-black hover:opacity-70',
  }

  return (
    <form className="mt-7 space-y-2.5">
      {isSubmitted ? (
        <div className={cn(formElemStyles.default, formElemStyles.solid, 'mx-auto')}>отправлено!</div>
      ) : (
        <div className="flex justify-center gap-2 sm:flex-col sm:gap-2">
          <input className={cn(formElemStyles.default, formElemStyles.outline)} type="text" placeholder="введите e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={cn(formElemStyles.default, formElemStyles.solid)} onClick={handleSubmit}>
            отправить
          </button>
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <input className="accent-black" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <label className="text-sm">даю согласие на обработку персональных данных</label>
      </div>
    </form>
  )
}
