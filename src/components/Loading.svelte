<script lang="ts">
    import { fade } from "svelte/transition";
    export let loading = false
  </script>

  {#if loading}
    <div class="loading" transition:fade>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 45.714285714285715 45.714285714285715" 
        style="transform: rotate(calc(-90deg));"
      >
        <circle
          class="loading__underlay" 
          fill="transparent" 
          cx="50%" 
          cy="50%" 
          r="20" 
          stroke-width="5.714285714285714" 
          stroke-dasharray="125.66370614359172" 
          stroke-dashoffset="0"
        ></circle>
        <circle 
          class="loading__overlay" 
          fill="transparent" 
          cx="50%" 
          cy="50%" 
          r="20" 
          stroke-width="5.714285714285714" 
          stroke-dasharray="125.66370614359172" 
          stroke-dashoffset="100.53096491487338px"
        ></circle>
      </svg>
    </div>
  {/if}

  <style lang="scss">
    .loading {
      position: absolute;
      margin: auto;
      left:0;
      right:0;
      top:0;
      bottom:0;
      width: 64px;
      aspect-ratio: 1;
      z-index: 100;
      & > svg {
        animation: loading-rotate 1.4s linear infinite;
        transform-origin: center center;
        transition: all .2s ease-in-out;
        width: 100%;
        height: 100%;
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
      }
    }
    .loading__overlay {
      stroke: var(--accent);
      transition: all .2s ease-in-out,stroke-width 0s;
      z-index: 2;
      animation: loading-stroke 1.4s ease-in-out infinite;
      stroke-dasharray: 25,200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
    .loading__underlay {
      color: rgba(0, 0, 0, 0.12);
      stroke: currentColor;
      z-index: 1;
    }
  </style>