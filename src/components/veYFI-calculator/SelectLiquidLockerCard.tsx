import React, { useState } from 'react'
import { Card, CardContent } from '../shadcn/card/card'
import { ExternalLink } from 'lucide-react'
import styles from './../../css/selectLiquidLockerCard.module.css'

// A rectangular button with a check box to the left, then a logo image, then the name of the element, and then to the right, an icon for an external link
interface SelectOption {
  id: string
  name: string
  logo: string
  veYFI: number
  selected: boolean
  url: string
}

type SelectLiquidLockerCardProps = {
  liquidLockerBalances: Record<string, number>
  setVeYFIAmount: (veYFIAmount: number) => void
  setUseLiquidLocker: (useLiquidLocker: boolean) => void
}

// A card that displays a list of SelectOptions
export default function SelectLiquidLockerCard(
  props: SelectLiquidLockerCardProps
) {
  const [options, setOptions] = useState<SelectOption[]>([
    {
      id: '1up',
      name: '1UP',
      logo: '/img/logos/upYFI.svg',
      veYFI: props.liquidLockerBalances._1UP,
      selected: false,
      url: 'https://example.com/1up',
    },
    {
      id: 'stakedao',
      name: 'StakeDAO',
      logo: '/img/logos/stakeDAO.svg',
      veYFI: props.liquidLockerBalances.stakeDAO,
      selected: false,
      url: 'https://example.com/stakedao',
    },
    {
      id: 'cove',
      name: 'Cove',
      logo: '/img/logos/cove.svg',
      veYFI: props.liquidLockerBalances.Cove,
      selected: false,
      url: 'https://example.com/cove',
    },
  ])

  const toggleSelect = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        selected: option.id === id, // Only one can be selected at a time
      }))
    )
  }

  const handleLiquidLockerClick = (id: string, veYFI: number) => {
    toggleSelect(id)
    props.setVeYFIAmount(veYFI)
    props.setUseLiquidLocker(true)
  }

  // Open an external link in a new tab
  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        {options.map((option) => (
          <button
            className={`${styles.liquidLockerButton} ${
              option.selected ? styles.selected : ''
            }`}
            key={option.id}
            onClick={(e) => {
              e.preventDefault()
              handleLiquidLockerClick(option.id, option.veYFI)
            }}
          >
            <div className={styles.liquidLockerTitle}>
              <img
                src={option.logo}
                alt={`${option.name} logo`}
                className={styles.logo}
              />
              <span className={styles.name}>{option.name}</span>
              <ExternalLink
                onClick={(e) => handleExternalLink(option.url, e)}
                className={styles.externalLink}
              />
            </div>
            <span className={styles.veYFIText}>
              {option.veYFI.toFixed(3)} veYFI
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
