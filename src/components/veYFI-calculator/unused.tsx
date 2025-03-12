import React from 'react'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card } from '../shadcn/card/card'
import styles from './select-card.module.css'

interface SelectOption {
  id: string
  name: string
  logo: string
  veYFI: number
  selected: boolean
  url: string
}

export default function SelectLiquidLockerCard() {
  const [options, setOptions] = useState<SelectOption[]>([
    {
      id: '1up',
      name: '1UP',
      logo: '/static/img/logos/1up.svg',
      veYFI: 168.6,
      selected: false,
      url: 'https://example.com/1up',
    },
    {
      id: 'stakedao',
      name: 'StakeDAO',
      logo: '/static/img/logos/stakeDAO.svg',
      veYFI: 236.6,
      selected: false,
      url: 'https://example.com/stakedao',
    },
    {
      id: 'cove',
      name: 'Cove',
      logo: '/static/img/logos/cove.svg',
      veYFI: 72.6,
      selected: false,
      url: 'https://example.com/cove',
    },
  ])

  const toggleSelect = (id: string) => {
    setOptions(
      options.map((option) => ({
        ...option,
        selected: option.id === id,
      }))
    )
  }

  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div key={option.id} className={styles.optionWrapper}>
              <div
                className={styles.option}
                onClick={() => toggleSelect(option.id)}
              >
                <div className={styles.optionContent}>
                  <div
                    className={`${styles.checkbox} ${
                      option.selected ? styles.checkboxSelected : ''
                    }`}
                  >
                    {option.selected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.checkIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className={styles.logo}>
                    {option.id === '1up' && (
                      <div>
                        <img src="/img/logos/upYFI.svg" />
                      </div>
                    )}
                    {option.id === 'stakedao' && (
                      <div>
                        <img src="/img/logos/stakeDAO.svg" />
                      </div>
                    )}
                    {option.id === 'cove' && (
                      <div>
                        <img src="/img/logos/cove.svg" />
                      </div>
                    )}
                  </div>
                  <span className={styles.name}>{option.name}</span>
                </div>
                <button
                  className={styles.externalLink}
                  onClick={(e) => handleExternalLink(option.url, e)}
                  aria-label={`Visit ${option.name} website`}
                >
                  <ExternalLink className={styles.externalLinkIcon} />
                </button>
              </div>
              <div className={styles.infoText}>
                {option.name} has {option.veYFI} veYFI
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
