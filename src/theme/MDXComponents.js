import React from 'react'
import MDXComponents from '@theme-original/MDXComponents'
import PrettyLink from '@site/src/components/PrettyLink'
import ContractData from '@site/src/components/ContractData'
import ContractAddress from '@site/src/components/StaticContractAddress'
import AddressCheck from '@site/src/components/AddressCheck'
import VeYFICalculator from '../components/veYFI-calculator/veYFI-calculator'
import AbiEncodingWidget from '../components/yPools-components/AbiEncodingWidget'
import GovDataYPools from '../components/yPools-components/GovDataYPools'

/**
 * Manually add the custom components to the list of MDXComponents that docusaurus uses
 */
export default {
  ...MDXComponents,
  PrettyLink,
  ContractData,
  ContractAddress,
  AddressCheck,
  VeYFICalculator,
  AbiEncodingWidget,
  GovDataYPools,
}
