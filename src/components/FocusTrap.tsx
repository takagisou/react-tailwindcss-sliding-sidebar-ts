import React, {FC, useEffect, useRef} from "react";

type FocusTrapProps = {
    isActive: boolean;
}

const FocusTrap: FC<FocusTrapProps> = ({isActive, children}) => {

    const topTabTrap = useRef<HTMLSpanElement>(null)
    const bottomTabTrap = useRef<HTMLSpanElement>(null)
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {

        // サイドメニューの表示・非表示が切り替えられる画面の大きさの時にサイドメニューが表示されている場合、
        // Tabキーを押した際、その中でのみフォーカスを切り替える（サイドメニュー外にフォーカスさせない）　
        const trapFocus = (event: FocusEvent) => {
            if (!isActive) return


            let elements: HTMLElement[] = []
            if (event.target === topTabTrap.current) {
                elements = getFocusableElements()

                if (elements.length > 0) {
                    const lastElement = elements[elements.length - 1]
                    lastElement.focus()
                }
            }
            if (event.target === bottomTabTrap.current) {
                elements = getFocusableElements()

                if (elements.length > 0) {
                    const firstElement = elements[0]
                    firstElement.focus()
                }
            }
        }

        const getFocusableElements = (): HTMLElement[] => {
            if (!container.current) return []

            const FOCUSABLE_SELECTOR = [
                'button',
                'a[href]',
                'input',
                'select',
                'textarea',
                '[tabindex]',
                '[contenteditable]',
            ]
                .map((selector) => `${selector}:not(:disabled):not([disabled])`)
                .join(', ')

            return Array.from(container.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
                .filter((element) => element !== topTabTrap.current)
                .filter((element) => element !== bottomTabTrap.current)
        }
        document.addEventListener('focusin', trapFocus)

        return () => {
            document.removeEventListener('focusin', trapFocus)
        }
    }, [isActive, topTabTrap, bottomTabTrap, container])


    return (
        <div ref={container}>
            {isActive && <span ref={topTabTrap} tabIndex={0}/>}
            {children}
            {isActive && <span ref={bottomTabTrap} tabIndex={0}/>}
        </div>
    )
}

export default FocusTrap