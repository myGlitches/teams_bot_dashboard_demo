import { toast as hotToast } from "react-hot-toast"

type ToastType = "success" | "error" | "loading" | "custom"

interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}

class Toast {
  success(message: string, options?: Omit<ToastOptions, "type" | "message">) {
    return hotToast.success(message, {
      duration: options?.duration,
      position: options?.position,
    })
  }

  error(message: string, options?: Omit<ToastOptions, "type" | "message">) {
    return hotToast.error(message, {
      duration: options?.duration,
      position: options?.position,
    })
  }

  loading(message: string, options?: Omit<ToastOptions, "type" | "message">) {
    return hotToast.loading(message, {
      duration: options?.duration,
      position: options?.position,
    })
  }

  custom(message: string, options?: Omit<ToastOptions, "message">) {
    return hotToast(message, {
      duration: options?.duration,
      position: options?.position,
    })
  }

  dismiss(toastId?: string) {
    return hotToast.dismiss(toastId)
  }

  promise<T>(
    promise: Promise<T>,
    msgs: {
      loading: string
      success: string
      error: string | ((err: any) => string)
    },
    opts?: Omit<ToastOptions, "type" | "message">
  ) {
    return hotToast.promise(
      promise,
      {
        loading: msgs.loading,
        success: msgs.success,
        error: (err) => (typeof msgs.error === "function" ? msgs.error(err) : msgs.error),
      },
      {
        duration: opts?.duration,
        position: opts?.position,
      }
    )
  }
}

export const toast = new Toast()