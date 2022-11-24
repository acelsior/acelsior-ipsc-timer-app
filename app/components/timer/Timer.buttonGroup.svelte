<script lang="ts">

</script>

<flexboxLayout>
    <button>MENU</button>
    <button>START</button>
    <button>CLEAR</button>
    <button>REVIEW</button>
    <button class="bigButton">MANUAL STOP</button>
</flexboxLayout>

<style lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		align-self: center;
		flex-wrap: wrap;
		width:75%;
	}

	button {
		width: 50%;
        font-size: 25px;
        background-color: $secondaryBackgroundColor;
	}

	.bigButton {
		width: 100%;
	}
</style>
