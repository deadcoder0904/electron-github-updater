import { api } from '../preload/index'

// ElectronAPI interface exposed through contextBridge
export interface ElectronAPI {
	// Config methods
}

// Add ElectronAPI to Window interface
declare global {
	interface Window {
		electronAPI: ElectronAPI
	}
}
