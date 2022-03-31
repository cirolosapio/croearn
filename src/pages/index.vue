<template>
  <div p2 h-full flex flex-col>
    <img src="/cards/all.png" alt="" />

    <n-input-number v-model:value="amount" placeholder="Importo" />

    <n-divider>CARTA</n-divider>
    <n-radio-group v-model:value="card" flex justify-around name="card">
      <n-radio v-for="c1 in cards" :key="c1" :value="c1">{{ c1 }}</n-radio>
    </n-radio-group>

    <n-divider>COIN</n-divider>
    <div overflow-x-auto flex space-x-8 p4>
      <img v-for="c1 in coins" :key="c1" :class="{ 'transform scale-175': c1 === coin }" style="height: 30px" :src="`/coins/${c1.toLowerCase()}.png`" @click="coin = c1" />
    </div>

    <n-divider>PERIODO</n-divider>
    <n-radio-group v-model:value="period" flex justify-around name="period">
      <n-radio v-for="p in periods" :key="p" :value="p">{{ p }}</n-radio>
    </n-radio-group>

    <n-divider>EARN</n-divider>
    <div text-center>
      <!--
        <div>amount: {{ amount }}</div>
        <div>card: {{ card }}</div>
        <div>coin: {{ coin }}</div>
        <div>period: {{ period }}</div>
        <div>{{ value }}</div>
      -->
      <n-number-animation ref="numberAnimationInstRef" :duration="3000" :precision="2" :from="from" :to="to" />%
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NumberAnimationInst } from 'naive-ui'
import type { Card, Coin, Period } from '~/types'

const coins: Coin[] = ['USDC', 'USDT', 'BTC', 'ETH', 'DOT', 'MATIC', 'AVAX', 'LUNA', 'EGLD', 'ATOM', 'SOL', 'ONE', 'FLOW']
const cards: Card[] = ['BLUE-RED', 'GREEN-ABOVE']
const periods: Period[] = ['FLEXIBLE', '1 MONTH', '3 MONTHS']

const percents: Record<Coin, Record<Card, Record<Period, number>>> = {
  CRO: {
    'BLUE-RED': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 6 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 6 },
  },
  LUNA: {
    'BLUE-RED': { 'FLEXIBLE': 1.5, '1 MONTH': 2.5, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 3.5, '3 MONTHS': 5 },
  },
  EGLD: {
    'BLUE-RED': { 'FLEXIBLE': 1.5, '1 MONTH': 2.5, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 3.5, '3 MONTHS': 5 },
  },
  ATOM: {
    'BLUE-RED': { 'FLEXIBLE': 1.5, '1 MONTH': 2.5, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 3.5, '3 MONTHS': 5 },
  },
  SOL: {
    'BLUE-RED': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 3 },
    'GREEN-ABOVE': { 'FLEXIBLE': 1.5, '1 MONTH': 3, '3 MONTHS': 4.5 },
  },
  AVAX: {
    'BLUE-RED': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 6 },
  },
  USDC: {
    'BLUE-RED': { 'FLEXIBLE': 1.5, '1 MONTH': 3, '3 MONTHS': 6 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 8 },
  },
  USDT: {
    'BLUE-RED': { 'FLEXIBLE': 1.5, '1 MONTH': 3, '3 MONTHS': 6 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 8 },
  },
  BTC: {
    'BLUE-RED': { 'FLEXIBLE': 0.5, '1 MONTH': 1.5, '3 MONTHS': 3 },
    'GREEN-ABOVE': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 4 },
  },
  ETH: {
    'BLUE-RED': { 'FLEXIBLE': 0.5, '1 MONTH': 1.5, '3 MONTHS': 3 },
    'GREEN-ABOVE': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 4 },
  },
  DOT: {
    'BLUE-RED': { 'FLEXIBLE': 6, '1 MONTH': 8, '3 MONTHS': 10 },
    'GREEN-ABOVE': { 'FLEXIBLE': 8, '1 MONTH': 10, '3 MONTHS': 12.5 },
  },
  MATIC: {
    'BLUE-RED': { 'FLEXIBLE': 6, '1 MONTH': 8, '3 MONTHS': 10 },
    'GREEN-ABOVE': { 'FLEXIBLE': 8, '1 MONTH': 10, '3 MONTHS': 12 },
  },
  ONE: {
    'BLUE-RED': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 6 },
  },
  FLOW: {
    'BLUE-RED': { 'FLEXIBLE': 1, '1 MONTH': 2, '3 MONTHS': 4 },
    'GREEN-ABOVE': { 'FLEXIBLE': 2, '1 MONTH': 4, '3 MONTHS': 6 },
  },
}

const amount = ref<number>()
const coin = ref<Coin>('USDC')
const card = ref<Card>('BLUE-RED')
const period = ref<Period>('FLEXIBLE')

const value = computed(() => percents[coin.value][card.value][period.value])

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
const from = ref<number>(1.5)
const to = ref<number>(1.5)
watch(
  value,
  (current, older) => {
    from.value = older
    to.value = current
    numberAnimationInstRef.value?.play()
  },
)
</script>
