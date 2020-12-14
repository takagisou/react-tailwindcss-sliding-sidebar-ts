import {CSSTransition as ReactCSSTransition} from "react-transition-group";
import React, {createContext, FC, useContext, useEffect, useRef} from "react";

type ITransitionContext = {
    parent: any;
}

const TransitionContext = createContext<ITransitionContext>({
    parent: {}
})

const useIsInitialRender = () => {
    const isInitialRender = useRef<boolean>(true)
    useEffect(() => {
        isInitialRender.current = false
    }, [])
    return isInitialRender.current
}

type TransitionProps = {
    show: boolean;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    appear?: boolean;
}

const CSSTransition: FC<TransitionProps> = (props) => {
    const {
        show,
        enter = '',
        enterFrom = '',
        enterTo = '',
        leave = '',
        leaveFrom = '',
        leaveTo = '',
        appear = false,
        children
    } = props

    const enterClasses = enter.split(' ').filter((s) => s.length)
    const enterFromClasses = enterFrom.split(' ').filter((s) => s.length)
    const enterToClasses = enterTo.split(' ').filter((s) => s.length)
    const leaveClasses = leave.split(' ').filter((s) => s.length)
    const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length)
    const leaveToClasses = leaveTo.split(' ').filter((s) => s.length)

    const addClasses = (node: HTMLElement, classes: string[]) => {
        classes.length && node.classList.add(...classes)
    }

    const removeClasses = (node: HTMLElement, classes: string[]) => {
        classes.length && node.classList.remove(...classes)
    }

    return (
        <ReactCSSTransition
            appear={appear}
            unmountOnExit
            in={show}
            addEndListener={(node: HTMLElement, done: () => void) => {
                node.addEventListener('transitionend', done, false)
            }}
            onEnter={(node: HTMLElement) => {
                removeClasses(node, [...leaveToClasses])
                addClasses(node, [...enterClasses, ...enterFromClasses])
            }}
            onEntering={(node: HTMLElement) => {
                removeClasses(node, [...enterFromClasses])
                addClasses(node, [...enterToClasses])
            }}
            onEntered={(node: HTMLElement) => {
                removeClasses(node, [...enterClasses])
            }}
            onExit={(node: HTMLElement) => {
                removeClasses(node, [...enterToClasses])
                addClasses(node, [...leaveClasses, ...leaveFromClasses])
            }}
            onExiting={(node: HTMLElement) => {
                removeClasses(node, [...leaveFromClasses])
                addClasses(node, [...leaveToClasses])
            }}
            onExited={(node: HTMLElement) => {
                removeClasses(node, [...leaveClasses])
            }}
        >
            {children}
        </ReactCSSTransition>
    )
}

const Transition: FC<TransitionProps> = (props) => {
    const {show, appear, ...rest} = props
    const {parent} = useContext<ITransitionContext>(TransitionContext)
    const isInitialRender = useIsInitialRender()
    const isChild = show === undefined

    return isChild ? (
        <CSSTransition
            appear={parent.appear || !parent.isInitialRender}
            show={parent.show}
            {...rest}
        />
    ) : (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear,
                },
            }}
        >
            <CSSTransition appear={appear} show={show} {...rest} />
        </TransitionContext.Provider>
    )
}

export default Transition;