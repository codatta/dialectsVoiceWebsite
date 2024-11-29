# Dialect Collection Tool MVP Requirements Document

## 1. Product Overview

### 1.1 Core Features
A simple dialect collection tool supporting both real-time recording and audio upload, with text-based timeline annotation.

### 1.2 Use Cases
- Recording dialect based on script
- Uploading existing dialect recordings
- Free conversation recording
- Audio-text alignment annotation

## 2. Functional Requirements

### 2.1 Recording Features
#### 2.1.1 Real-time Recording Mode
- Recording controls (Start/Pause/Stop)
- Real-time volume visualization
- Recording duration display
- Playback function
- Re-recording option

#### 2.1.2 Audio Upload Mode
- Drag-and-drop upload
- File selection upload
- Supported formats: MP3/WAV
- File size limit: 50MB

### 2.2 Audio Processing
- Basic audio trimming
- Waveform display
- Audio timeline annotation

### 2.3 Text Alignment
- Text input/paste
- Speech segment and text alignment
- Timestamp marking

## 3. Interface Design

### 3.1 Main Interface
- Two main entry points: Live Recording/Upload Audio
- Recent recordings list (local storage)

### 3.2 Recording Interface
#### 3.2.1 Live Recording
![Recording Interface Mockup]

Layout:
- Top: Recording Control Area
  - Recording button (Start/Pause/Stop)
  - Recording duration
  - Volume indicator

- Middle: Text Display Area (Optional)
  - Script display
  - Font size adjustment

- Bottom: Audio Visualization Area
  - Waveform display
  - Timeline

#### 3.2.2 Audio Upload Interface
Layout:
- Drag-and-drop zone
- File selection button
- Upload progress indicator
- Format/size guidelines

### 3.3 Audio Editing Interface
Layout:
- Audio Waveform Area
  - Waveform visualization
  - Draggable timeline
  - Playback controls

- Text Alignment Area
  - Text input field
  - Timestamp marking buttons
  - Alignment preview

## 4. Interaction Flow

### 4.1 Live Recording Flow
1. Select "Live Recording"
2. (Optional) Input/paste script
3. Click record button to start
4. Display waveform and duration during recording
5. Auto-play preview after stopping
6. Confirm save or re-record

### 4.2 Audio Upload Flow
1. Select "Upload Audio"
2. Drag-and-drop or select audio file
3. Auto-enter editing interface after upload
4. Input/paste corresponding text
5. Perform audio-text alignment annotation

### 4.3 Audio Annotation Flow
1. Play audio
2. Click mark button at key points
3. Auto-generate timestamps
4. Adjust text correspondence
5. Preview confirmation
6. Export annotation results

## 5. Technical Requirements

### 5.1 Audio Processing
- Sample rate: 16kHz/48kHz
- Format: WAV/MP3
- Mono channel

### 5.2 Storage Solution
- Browser IndexedDB for audio files
- LocalStorage for configuration
- Support for audio and annotation data export

### 5.3 Performance Requirements
- Recording latency: <200ms
- Audio processing response time: <1s
- Maximum supported audio length: 30 minutes

## 6. MVP Feature Priority

### P0 (Must Have)
- Basic recording functionality
- Audio upload
- Waveform display
- Simple audio-text alignment

### P1 (Important but Not Essential)
- Audio trimming
- Real-time volume display
- Timeline annotation

### P2 (Future Optimization)
- Audio format conversion
- Noise reduction
- Batch processing