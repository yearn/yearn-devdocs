import React from 'react'
import { useEffect } from 'react'
import DocItem from '@theme-original/DocItem'

export default function DocItemWrapper(props) {
  const handleHashChange = () => {
    const hash = decodeURIComponent(window.location.hash)
    if (hash) {
      const id = hash.startsWith('#') ? hash.slice(1) : hash
      const heading =
        document.getElementById(id) ||
        (typeof CSS !== 'undefined' && CSS.escape
          ? document.querySelector(`#${CSS.escape(id)}`)
          : null)
      if (heading) {
        const details = heading.closest('details')
        if (details) {
          details.open = true
          details.removeAttribute('data-collapsed')
          details.querySelector('summary').click()
        }
      }
    }
  }

  useEffect(() => {
    handleHashChange() // Run on initial load

    window.addEventListener('hashchange', handleHashChange) // Run on hash change

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <>
      <DocItem {...props} />
    </>
  )
}
