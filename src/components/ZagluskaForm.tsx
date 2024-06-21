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

    try {
      const GOOGLE_SHEET_SCRIPT = 'https://script.google.com/macros/s/AKfycbwUasSXqEIHl6T7q9t8i5Ag7WpYZlFPVAPhQqNBDHTkv0yZsUQZ8qY9tEeT0u4l4Gmh/exec'

      const formdata = new FormData()
      formdata.append('Email', email)
      const response = await axios.post(GOOGLE_SHEET_SCRIPT, formdata)

      console.log('Submitted email:', email)
      console.log('Response data:', response.data)

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.log('Error:', error)
    }
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
