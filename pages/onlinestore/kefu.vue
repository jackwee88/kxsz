<template>
	<view>
		<web-view :webview-styles="webviewStyles" 
		src="https://webchat.7moor.com/wapchat.html?accessId=b81de290-6f29-11ea-98a4-5f0d9c2396fc&fromUrl=xuta&urlTitle=球哥">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
				progress: {
				           color: '#FF3333',
				          }
				              },
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
