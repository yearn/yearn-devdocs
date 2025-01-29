import React, { useState, useMemo } from 'react'
import * as AllABIs from '../ethereum/ABIs'
import { encodeFunctionData } from 'viem'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './shadcn/card/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './shadcn/select/select'
import Input from './shadcn/input/input'
import { Button } from './shadcn/button/button'
import styles from '../css/widgets.module.css'
import { CopyIcon } from 'lucide-react'

interface AbiEncodingWidgetProps {
  defaultAbi?: string
  defaultFunction?: string
  widgetTitle?: string | undefined
  functionArg?: string
}

export function AbiEncodingWidget({
  defaultAbi = 'yPoolsInclusionVoteABI',
  defaultFunction = 'set_enable_epoch',
  widgetTitle = undefined,
  functionArg = '',
}: AbiEncodingWidgetProps) {
  const [selectedAbiKey, setSelectedAbiKey] = useState(defaultAbi)
  const [selectedFunction, setSelectedFunction] = useState(defaultFunction)
  const [argValue, setArgValue] = useState<string>(functionArg)
  const [encodedData, setEncodedData] = useState('')

  const allAbiKeys = Object.keys(AllABIs).filter((key) =>
    Array.isArray((AllABIs as any)[key])
  )
  const functions = useMemo(() => {
    const abi = (AllABIs as any)[selectedAbiKey] || []
    return abi
      .filter((entry: any) => entry.type === 'function')
      .map((entry: any) => entry.name)
  }, [selectedAbiKey])

  const encodeData = () => {
    try {
      const abi = (AllABIs as any)[selectedAbiKey]
      const data = encodeFunctionData({
        abi,
        functionName: selectedFunction,
        // For simplicity, assume one argument that requires a bigint
        args: [BigInt(argValue || '0')],
      })
      setEncodedData(data)
    } catch (err) {
      setEncodedData('Error encoding data')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedData)
  }

  return (
    <>
      <Card style={{ padding: '1rem' }}>
        {widgetTitle && (
          <CardHeader className={styles.CardHeader}>
            <CardTitle>{widgetTitle}</CardTitle>
          </CardHeader>
        )}
        <CardContent
          style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
        >
          <Select
            value={selectedAbiKey}
            onValueChange={(val) => setSelectedAbiKey(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ABI" />
            </SelectTrigger>
            <SelectContent>
              {allAbiKeys.map((key) => (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedFunction}
            onValueChange={(val) => setSelectedFunction(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent>
              {functions.map((fn) => (
                <SelectItem key={fn} value={fn}>
                  {fn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            style={{ textAlign: 'right' }}
            type="text"
            placeholder={functionArg ? functionArg : 'Function argument'}
            value={argValue}
            onChange={(e) => setArgValue(e.target.value)}
          />
        </CardContent>
        <CardFooter className={styles.CardFooter}>
          <Button
            onClick={encodeData}
            style={{ width: '100%', maxWidth: 'none' }}
            disabled={!selectedAbiKey || !selectedFunction || !argValue}
          >
            Encode
          </Button>
          {encodedData && (
            <>
              <strong>Result:</strong>
              <Card
                className={styles.encodedDataCard}
                onClick={copyToClipboard}
              >
                <CardContent style={{ wordBreak: 'break-all' }}>
                  {encodedData}
                </CardContent>
                <div className={styles.copyIcon}>
                  <CopyIcon />
                </div>
              </Card>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  )
}

export default AbiEncodingWidget
