import {useMediaQuery} from 'react-responsive'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

const Tailwind = resolveConfig(tailwindConfig)

const useBreakPoint = (breakpoint: string): boolean => {
    return useMediaQuery({ // 640px以上の時は固定画面として扱う？（メニュー出しっぱなし）
        query: `(min-width: ${Tailwind.theme.screens[breakpoint]})`,
    })
}

export default useBreakPoint