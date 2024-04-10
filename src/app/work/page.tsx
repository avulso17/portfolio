'use client'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import {
  CheckIcon,
  DiscIcon,
  LockClosedIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'
import clsx from 'clsx'

type Status = 'claimable' | 'claimed' | 'expired'

type RewardItem = {
  _id: string
  amountUsd: number
  claimed: number
  status: string
  statusGroup: string[]
}

interface Rewards extends Array<RewardItem> {}

const rewards: Rewards = [
  {
    _id: '5f5b3b3b-1b7b-4b3b-8b3b-3b3b3b3b3b3b',
    amountUsd: 1000,
    claimed: 0,
    status: 'pending',
    statusGroup: ['pending', 'pending', 'pending'],
  },
  {
    _id: '5f5b3b3b-asdasdasd-4b3b-8b3b-3b3b3b3b3b3b',
    amountUsd: 1000,
    claimed: 1,
    status: 'pending',
    statusGroup: ['pending', 'pending', 'pending'],
  },
  {
    _id: '5f5b3b3b-1b7b-asdasd-8b3b-3b3b3b3b3b3b',
    amountUsd: 1000,
    claimed: 2,
    status: 'pending',
    statusGroup: ['pending', 'pending', 'pending'],
  },
  {
    _id: '5f5b3b3b-1b7b-4b3b-8b3b-3basdasdasd',
    amountUsd: 1000,
    claimed: 3,
    status: 'claimed',
    statusGroup: ['pending', 'pending', 'pending'],
  },
]

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI']

function RewardCountItem({ status }: { status: Status }) {
  const icons = {
    claimable: <DiscIcon className='h-5 w-5 text-warning' />,
    claimed: <CheckIcon className='h-5 w-5 text-success' />,
    expired: <StopwatchIcon className='h-5 w-5 text-error' />,
  }

  return (
    <div
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full border border-gray',
        {
          'border-success': status === 'claimed',
        }
      )}
    >
      {icons[status]}
    </div>
  )
}

function Card({ date, reward }: { date: Date; reward: Partial<RewardItem> }) {
  const handleAvailableRewardValue = () => {
    if (!reward?.amountUsd) return 0

    switch (reward.claimed) {
      case 0:
        return reward.amountUsd
      case 1:
        return (reward.amountUsd / 3) * 2
      case 2:
        return reward.amountUsd / 3
      case 3:
        return 0
    }
  }

  const availableRewardValue = handleAvailableRewardValue()
  const isToday = true

  return (
    <div className='flex h-72 w-56 flex-col items-center  rounded-lg border border-gray p-2.5'>
      <span className='text-xl font-bold text-info'>23 JUL</span>
      <p className='mb-2 font-bold'>{isToday ? 'TODAY' : 'FRIDAY'}</p>
      <div className='mb-4 flex w-full grow flex-col items-center justify-center gap-5 rounded bg-gray-dark/10 p-1'>
        <RewardCount activeItem={reward.claimed} isToday={isToday} />
        <span className='text-center text-xs'>{date.toISOString()}</span>
      </div>
      <Button variant='secondary' width='full'>
        {isToday ? (
          <>CLAIM {availableRewardValue?.toFixed(2)}</>
        ) : (
          <LockClosedIcon />
        )}
      </Button>
    </div>
  )
}

function RewardCount({
  activeItem = 0,
  isToday = true,
}: {
  activeItem?: number
  isToday: boolean
}) {
  function handleStatus(index: number): Status {
    if (activeItem >= index) return 'claimed'
    if (activeItem < index && isToday) return 'claimable'
    return 'expired'
  }

  return (
    <div className='flex items-center gap-4'>
      {[1, 2, 3].map((index) => (
        <RewardCountItem key={index} status={handleStatus(index)} />
      ))}
    </div>
  )
}

// const items =

export default function WorkPage() {
  return (
    <main className='h-screen w-full'>
      <Header title='Project' subtitle="Projects and ideas I've worked on" />

      <section className='mt-32 flex flex-col items-center'>
        <h2 className='mb-8 text-4xl font-bold'>Rewards proto</h2>

        <div className='flex gap-2'>
          {rewards.map((reward) => (
            <Card key={reward._id} reward={reward} date={new Date()} />
          ))}
        </div>
      </section>
    </main>
  )
}
