<script lang="ts">
	import MatrixLogo from './MatrixLogo.svelte';
	import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import PinIcon from 'svelte-material-icons/Pin.svelte';

	const mxid: Readable<string> = getContext('mxid');
</script>

<!-- TODO: show different instructions on mobile -->

<div id="instructions-container" class="flex">
    <div id="matrix-instructions" class="space-y-4 flex-grow">
        <p>
            Welcome to the <MatrixLogo />. To chat, you will need a Matrix app.
        </p>
    
        <p>
            We have opened a <img
                src="https://matrix.mit.edu/media/jRbOYeVrDhIksWyNIzoStGZE"
                width="20em"
                alt="element icon"
                class="inline"
            />
            tab so that you can use <strong>matrix.mit.edu</strong> on your browser.
        </p>
    
        <p>We recommend:</p>
    
        <div class="w-auto text-token card p-4 space-y-4">
            <dl class="list-dl">
                <div>
                    <span class="badge p-4 variant-soft-primary"
                        ><PinIcon color={'rgb(var(--color-primary-200))'} width={'16px'} height={'16px'} /></span
                    >
                    <span class="flex-auto"
                        ><dt class="font-bold">Pinning the tab</dt>
                        <dd class="text-sm opacity-80">Right click the tab, and click on "Pin tab".</dd></span
                    >
                </div>
                <!-- TODO(skeleton) icons have inconsistent styling -->
                <div>
                    <span class="badge p-4 variant-soft-primary"><i class="fa-solid fa-download"></i></span>
                    <span class="flex-auto"
                        ><dt class="font-bold">
                            Installing the <a class="anchor" href="https://matrix.mit.edu/mobile/" target="_blank"
                                >Element</a
                            > app on your phone
                        </dt>
                        <dd class="text-sm opacity-80">
                            Be sure to select
                            <strong>I already have an account</strong>
                            and set your server to <strong>matrix.mit.edu</strong>.
                        </dd></span
                    >
                </div>
                <div>
                    <span class="badge p-4 variant-soft-primary"><i class="fa-solid fa-bell"></i></span>
                    <span class="flex-auto"
                        ><dt class="font-bold">Enabling notificatoins</dt>
                        <dd class="text-sm opacity-80">
                            Make sure to accept the notifications prompt so you don't miss any messages.
                        </dd></span
                    >
                </div>
            </dl>
        </div>
    
        <p>If you need any help with Matrix, don't hesitate to contact matrix@mit.edu.</p>
    
        <!-- TODO(skeleton): opening this shrinks the QR code -->
        <details>
            <summary>More info</summary>
    
            <p class="blockquote not-italic">
                Matrix is a free an open source federated messaging network. Just like email, you have a user
                ID, which is <strong>{$mxid}</strong>.
                <a href="https://sipb.mit.edu" target="_blank">SIPB</a> is hosting a Matrix server for MIT at
                <strong>{PUBLIC_MATRIX_HOMESERVER}</strong>. If you would like to learn more about Matrix, you
                can visit the project's website at
                <a class="anchor" href="https://matrix.org" rel="noopener" target="_blank">matrix.org</a>. If
                you would like to collaborate on SIPB Matrix, come to a SIPB meeting in W20-557 on a Monday at
                7:30 pm, or email matrix@mit.edu.
            </p>
        </details>
    </div>
    <div class="ml-8 my-auto">
        <img src="qr-code.png" title="QR code to download Element on your phone" alt="Download Element on your phone via the app store." class="size-min"/>
    </div>    
</div>
