import Image from "next/image";
import Close from '@/assets/icons/icons_picker/close.svg'
import Loading from '@/assets/icons/icons_picker/loadingIcon.svg'
import Config from '@/assets/icons/icons_picker/config.svg'
import Finish from '@/assets/icons/icons_picker/finish.svg'

export function Icons(props: { iconName: string }) {
  return (
    <>
      {props.iconName === 'Close' && <Image src={Close} alt="Close icon" />}
      {props.iconName === 'Loading' && <Image src={Loading} alt="Loading icon" />}
      {props.iconName === 'Config' && <Image src={Config} alt="Config icon" />}
      {props.iconName === 'Finish' && <Image src={Finish} alt="Finish icon" />}
    </>
  )
}