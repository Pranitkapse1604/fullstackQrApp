import { AlertCircle,CheckCircle } from "lucide-react"

function MyAlertNotification({serverErrMsg,isServerMsgGreen}) {
  return (              
                <div className={`flex items-center gap-2 px-2 py-2 border  rounded-sm text-sm barlow ${isServerMsgGreen?"text-green-600 border-green-600":"text-red-600 border-red-500"}`}> 
                  {isServerMsgGreen?<CheckCircle className="h-4 w-4"/>:<AlertCircle className="h-4 w-4"/>}
                    {serverErrMsg}
                </div> 
  )
}

export default MyAlertNotification