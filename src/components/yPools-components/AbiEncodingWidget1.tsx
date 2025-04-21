import React, { useState, useMemo } from 'react'
import * as AllABIs from '../../ethereum/ABIs'
import { encodeFunctionData } from 'viem'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../shadcn/card/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../shadcn/select/select'
import Input from '../shadcn/input/input'
import { Button } from '../shadcn/button/button'

interface AbiEncodingWidgetProps {
  defaultAbi?: string
  defaultFunction?: string
}

export function AbiEncodingWidget({
  defaultAbi = 'yPoolsInclusionVoteABI',
  defaultFunction = 'set_enable_epoch',
}: AbiEncodingWidgetProps) {
  const [selectedAbiKey, setSelectedAbiKey] = useState(defaultAbi)
  const [selectedFunction, setSelectedFunction] = useState(defaultFunction)
  const [argValue, setArgValue] = useState<string>('')
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>ABI Encoder</CardTitle>
      </CardHeader>
      <CardContent>
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
          type="text"
          placeholder="Function argument"
          value={argValue}
          onChange={(e) => setArgValue(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={encodeData}>Encode</Button>
      </CardFooter>
      {encodedData && (
        <div style={{ marginTop: '1rem', wordBreak: 'break-all' }}>
          {encodedData}
        </div>
      )}
    </Card>
  )
}
export default AbiEncodingWidget
