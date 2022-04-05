<template>
  <div p2 h-full flex flex-col>
    <img src="/cards/all.png" />

    <n-divider>CARD</n-divider>
    <n-radio-group v-model:value="card" flex justify-around name="card">
      <n-radio v-for="c1 in cards" :key="c1" :value="c1">{{ c1 }}</n-radio>
    </n-radio-group>

    <n-divider>COIN</n-divider>
    <div overflow-x-auto pb3 px3>
      <div flex space-x-2>
        <img v-for="c1 in coins" :key="c1" transition duration-300 :class="c1 === coin ? 'scale-100' : 'scale-50'" style="height: 50px" :src="`/coins/${c1.toLowerCase()}.png`" @click="coin = c1" />
      </div>
    </div>

    <n-divider>TERM</n-divider>
    <n-radio-group v-model:value="term" flex justify-around name="term">
      <n-radio v-for="p in terms" :key="p" :disabled="compound && p === 'FLEXIBLE'" :value="p">{{ p }}</n-radio>
    </n-radio-group>

    <n-divider>
      EARN
      <n-number-animation ref="numberAnimationInstRef" :duration="3000" :precision="2" :from="from" :to="to" />%
    </n-divider>

    <div flex justify-evenly items-center space-x-2 mb2>
      <div>
        <n-switch v-model:value="mode" checked-value="slider" unchecked-value="input">
          <template #checked-icon><div i-uil-slider-h /></template>
          <template #unchecked-icon><div i-iconoir-input-field /></template>
        </n-switch>
      </div>

      <n-slider v-if="mode === 'slider'" v-model:value="amount" class="w50%" my2 :min="0" :max="10000" :step="500" />
      <n-input-number v-else v-model:value="amount" class="w50%" :step="1000" placeholder="AMOUNT">
        <template #prefix>€</template>
      </n-input-number>

      <n-tooltip placement="top-end">
        <template #trigger>
          <n-switch v-model:value="compound" :disabled="term === 'FLEXIBLE'" />
        </template>
        Compound
      </n-tooltip>
    </div>

    <n-table size="small">
      <thead>
        <tr>
          <th>
            <n-switch v-model:value="show">
              <template #checked>TOTAL</template>
              <template #checked-icon><div i-ic-twotone-show-chart /></template>
              <template #unchecked>TOTAL</template>
              <template #unchecked-icon><div i-ph-eye-closed-duotone /></template>
            </n-switch>
          </th>
          <th w1><div text-center>%</div></th>
          <th w1><div text-center>€</div></th>
          <th v-if="compound" w1><div text-center>+/-</div></th>
          <th v-if="show" w1><div text-center>€</div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.label">
          <td>{{ row.label }}</td>
          <td text-right>{{ format(row.percent) }}</td>
          <td text-right>
            <div v-if="row.earn" text-teal>
              +<n-number-animation ref="numberAnimationInstRef" :duration="1000" :precision="2" :to="row.earn" />
            </div>
          </td>
          <td v-if="compound" text-right>
            <div v-if="getCompound(row.dot)" text-teal>
              +<n-number-animation ref="numberAnimationInstRef" :duration="1000" :precision="2" :to="getCompound(row.dot)" />
            </div>
          </td>
          <td v-if="show" text-right>{{ format(row.total + (compound ? getCompound(row.dot) : 0)) }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang="ts">
import type { Mode } from 'node:fs'
import type { NumberAnimationInst } from 'naive-ui'
import type { Card, Coin, Term } from '~/types'
import { percents } from '~/assets'

const coins: Coin[] = [
  'USDC', 'USDT', 'CRO', 'BTC', 'ETH', 'DOT', 'MATIC', 'AVAX', 'LUNA', 'EGLD', 'ATOM', 'SOL', 'ONE', 'FLOW',
  'TUSD', 'DAI', 'PAXG', 'GAS', 'STRAX', 'LTC', 'XRP', 'BNB', 'BAT', 'LINK', 'MKR', 'VET', 'ICX', 'ADA', 'ENJ',
  'ALGO', 'COMP', 'MANA', 'DOGE', 'SHIB', 'EOS', 'XLM', 'XTZ', 'OMG', 'UNI', 'BNT', 'BIFI',

  // no image
  // 'TONIC', 'ONG', CELR, 'KNC', 'BHC', 'PAX', 'TAXG', 'TGBP', 'TCAD', 'TAUD'
]
const cards: Card[] = ['BLUE-RED', 'GREEN-ABOVE']
const terms: Term[] = ['FLEXIBLE', '1 MONTH', '3 MONTHS']

const mode = ref<Mode>('slider')
const amount = ref<number>(0)
const compound = ref(false)
const coin = ref<Coin>('USDC')
const card = ref<Card>('BLUE-RED')
const term = ref<Term>('3 MONTHS')

const show = ref(false)
const pa = computed(() => percents[coin.value][card.value][term.value])

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
const from = ref<number>(percents[coin.value][card.value][term.value])
const to = ref<number>(percents[coin.value][card.value][term.value])

watch(
  pa,
  (current, older) => {
    from.value = older
    to.value = current
    numberAnimationInstRef.value?.play()
  },
)

const periods = {
  'DAY': 365,
  'WEEK': 52,
  'MONTH': 12,
  '3 MONTHS': 4,
  '6 MONTHS': 2,
  'YEAR': 1,
}

const hasDecimal = computed(() => (v: number) => v % 1 !== 0)
const formatDecimal = computed(() => (v: number) => hasDecimal.value(v) ? v.toFixed(2) : v.toFixed(0))
const format = computed(() => (v: number) => {
  if (v === 0) return ''
  else if (v < 10) return formatDecimal.value(v)
  else if (v < 10_000) return v.toFixed(0)
  else if (v < 1_000_000) return `${formatDecimal.value(v / 1000)}k`
  else if (v < 1_000_000_000) return `${formatDecimal.value(v / 1_000_000)}m`
  return v.toFixed(0)
})

const recurrency = computed(() => term.value === '3 MONTHS' ? 3 : 1)
const earn = computed(() => {
  let tot = amount.value
  for (let i = 0; i < 12 / recurrency.value; i++) tot += tot * pa.value / 1200 * recurrency.value
  return tot
})

const rows = computed(() => Object.entries(periods).map(([label, dot]) => ({
  label,
  dot,
  percent: pa.value / dot,
  earn: amount.value * pa.value / 100 / dot,
  total: amount.value + amount.value * pa.value / 100 / dot,
})))

const getCompound = computed(() => (dot: number) => (earn.value - amount.value - rows.value.at(-1).earn) / dot)
</script>
