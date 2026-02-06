import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'

function TimeAgo({timestamp}) {
  let timesAge=''
  if(timestamp){
    const date=parseISO(timestamp)
    const timePeriod=formatDistanceToNow(date)
    timesAge=`${timePeriod} ago`
  }
  return (
    <span title={timestamp}>
     &nbsp; <i>{timesAge==="less than a minute ago"?"Just now":timesAge}</i> 
    </span>
  )
}

export default TimeAgo
