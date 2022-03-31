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

    <n-divider>
      {{ coin }}
      EARN -
      <n-number-animation ref="numberAnimationInstRef" :duration="3000" :precision="2" :from="from" :to="to" />%
    </n-divider>
    <div text-center>
      <n-table size="small">
        <thead>
          <tr>
            <th />
            <th w20><div text-center>%</div></th>
            <th w20><div text-center>€</div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DAY</td>
            <td text-center>
              +{{ (value / 365).toFixed(2) }}
            </td>
            <td text-center>
              +{{ (amount * value / 100 / 365).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>WEEK</td>
            <td text-center>
              +{{ (value / 52).toFixed(2) }}
            </td>
            <td text-center>
              +{{ (amount * value / 100 / 52).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>MONTH</td>
            <td text-center>
              +{{ (value / 12).toFixed(2) }}
            </td>
            <td text-center>
              +{{ (amount * value / 100 / 12).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>3 MONTHS</td>
            <td text-center>
              +{{ (value / 4).toFixed(2) }}
            </td>
            <td text-center>
              +{{ (amount * value / 100 / 4).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>YEAR</td>
            <td text-center>
              +{{ value.toFixed(2) }}
            </td>
            <td text-center>
              +{{ (amount * value / 100).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </n-table>
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

const amount = ref<number>(5000)
const coin = ref<Coin>('USDC')
const card = ref<Card>('BLUE-RED')
const period = ref<Period>('3 MONTHS')

const value = computed(() => percents[coin.value][card.value][period.value])

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
const from = ref<number>(percents[coin.value][card.value][period.value])
const to = ref<number>(percents[coin.value][card.value][period.value])
watch(
  value,
  (current, older) => {
    from.value = older
    to.value = current
    numberAnimationInstRef.value?.play()
  },
)
</script>
