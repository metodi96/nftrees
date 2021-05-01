import React from 'react'

const TreeSection = () => {
    return (
        <div className='mt-12 sm:mt-16 text-center'>
            <div className="flex flex-col space-y-4 items-center">
                <h1 className="text-xl sm:text-4xl">Your <b className='text-green-700'>eco-friendly</b> NFT marketplace</h1>
                <h3 className="text-sm sm:text-xl text-gray-400 sm:w-96">By creating and trading a NFT you are indirectly planting new trees all around the world</h3>
                <div className="flex justify-center space-x-10">
                    <a href='/create' rel='noreferrer' className="bg-green-700 w-30 sm:w-40 hover:shadow-xl text-white font-bold py-3 px-4 rounded-2xl">
                        Create
                    </a>
                </div>
            </div>
            {/** svg image by https://undraw.co/ - editted using https://editor.method.ac/ */}
            <div className='hidden sm:flex sm:justify-center'>
                <svg width="811.34934" height="624.08084" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <title>Layer 1</title>
                        <path id="svg_1" fill="#ffb8b8" d="m421.82417,432.16029a11.48908,11.48908 0 0 1 -8.8618,-15.226l-50.423,-87.20919l23.83287,-7.50038l42.114,87.98251a11.55132,11.55132 0 0 1 -6.662,21.953l-0.00007,0.00006z" />
                        <path id="svg_2" fill="#6c63ff" d="m364.31478,343.85699a4.78018,4.78018 0 0 1 -3.39927,-2.553l-13.30464,-26.23257a4.81473,4.81473 0 0 1 1.35821,-5.99083l14.24007,-10.95317a4.78746,4.78746 0 0 1 6.24873,0.32452l19.74779,18.76437a4.81188,4.81188 0 0 1 -0.11409,7.0824l-20.68282,18.42228a4.786,4.786 0 0 1 -4.094,1.136l0.00002,0z" />
                        <path id="svg_3" fill="#057804" d="m811.34934,226.54562c0,-67.16541 -54.44832,-226.54562 -121.61374,-226.54562s-121.61373,159.38021 -121.61373,226.54562a121.61374,121.61374 0 1 0 243.22747,0z" />
                        <path id="svg_4" fill="#7f3f00" d="m689.73567,596.41797a1,1 0 0 0 1,-1l0,-493.28418a1,1 0 0 0 -2,0l0,493.28418a1,1 0 0 0 1,1z" />
                        <path id="svg_5" fill="#7f3f00" d="m689.73567,183.07959a0.9968,0.9968 0 0 0 0.70716,-0.293l48.13452,-48.13427a1,1 0 0 0 -1.41431,-1.41407l-48.13452,48.13428a1,1 0 0 0 0.70715,1.707l0,0.00006z" />
                        <path id="svg_6" fill="#7f3f00" d="m689.73567,266.40967a1,1 0 0 0 0.70716,-1.707l-80.61,-80.61035a1,1 0 0 0 -1.4143,1.41406l80.61,80.61035a0.99705,0.99705 0 0 0 0.70714,0.29294z" />
                        <path id="svg_7" fill="#f2f2f2" d="m762.62912,623.61381c-0.17386,0.13428 -0.35659,0.25486 -0.53222,0.38619l-149.09315,0c-2.92142,-11.83653 -3.953,-23.68571 0.4107,-33.97582c6.21716,-14.66282 24.61808,-23.81571 39.24692,-17.51888a22.3376,22.3376 0 0 1 8.77357,6.94176c5.71689,-10.23335 15.9718,-17.949 27.80872,-17.94055c14.82975,0.01059 27.15986,12.13812 31.18341,26.14659c6.47972,-10.937 19.27818,-18.58031 31.78747,-15.29233c20.92318,5.49929 27.53196,38.02404 10.41458,51.25304z" />
                        <path id="svg_8" fill="#057804" d="m174.89649,392.29098c0,-48.26367 -39.15192,-162.791 -87.44825,-162.791s-87.44824,114.52731 -87.44824,162.791a87.44827,87.44827 0 0 0 174.89649,0z" />
                        <path id="svg_9" fill="#7f3f00" d="m87.44827,604.89871a0.71881,0.71881 0 0 0 0.71907,-0.71858l0,-301.28891a0.71907,0.71907 0 0 0 -1.43813,0l0,301.28891a0.7188,0.7188 0 0 0 0.71906,0.71858z" />
                        <path id="svg_10" fill="#7f3f00" d="m87.44827,361.05719a0.717,0.717 0 0 0 0.50849,-0.21052l34.61191,-34.58825a0.71881,0.71881 0 1 0 -1.017,-1.01612l-34.61188,34.5883a0.71858,0.71858 0 0 0 0.50849,1.22663l-0.00001,-0.00004z" />
                        <path id="svg_11" fill="#7f3f00" d="m87.44827,420.93642a0.71858,0.71858 0 0 0 0.50849,-1.22664l-57.96386,-57.92492a0.71881,0.71881 0 1 0 -1.017,1.01611l57.96386,57.92493a0.71723,0.71723 0 0 0 0.50851,0.21052z" />
                        <path id="svg_12" fill="#f2f2f2" d="m139.47002,623.72249c-0.125,0.09649 -0.25641,0.18314 -0.3827,0.27751l-107.20774,0c-2.10069,-8.50549 -2.84249,-17.02006 0.29532,-24.41432c4.47055,-10.5364 17.702,-17.11347 28.2211,-12.5887a16.06033,16.06033 0 0 1 6.30878,4.9882c4.11082,-7.35347 11.48477,-12.89776 19.99629,-12.89171c10.66356,0.00761 19.52972,8.72221 22.42291,18.78841c4.65935,-7.85913 13.86228,-13.35143 22.85728,-10.98876c15.04513,3.95168 19.79728,27.3233 7.48876,36.82937z" />
                        <path id="svg_13" fill="#3f3d56" d="m181.4998,625l381,0a1,1 0 0 0 0,-2l-381,0a1,1 0 1 0 0,2z" />
                        <path id="svg_14" fill="#6c63ff" d="m361.8521,350.16202a4.78021,4.78021 0 0 1 -3.32755,-2.64584l-12.57581,-26.58964a4.81474,4.81474 0 0 1 1.523,-5.95107l14.53683,-10.55605a4.78749,4.78749 0 0 1 6.2374,0.4968l19.2226,19.302a4.81189,4.81189 0 0 1 -0.30945,7.07655l-21.18322,17.84465a4.786,4.786 0 0 1 -4.1238,1.02261l0,-0.00001z" />
                        <polygon id="svg_15" fill="#ffb8b8" points="282.179 602.252 294.831 605.694 314.129 558.533 295.457 553.453 282.179 602.252" />
                        <path id="svg_16" transform="rotate(-164.779 576.906 1462.99)" fill="#2f2e41" d="m1048.87008,2203.97505l41.20773,0a0,0 0 0 1 0,0l0,15.92117a0,0 0 0 1 0,0l-26.32087,0a14.88686,14.88686 0 0 1 -14.88686,-14.88686l0,-1.03431a0,0 0 0 1 0,0z" />
                        <polygon id="svg_17" fill="#ffb8b8" points="390.336 611.906 403.447 611.905 409.685 561.332 390.333 561.333 390.336 611.906" />
                        <path id="svg_18" transform="rotate(179.997 1010.62 1370.17)" fill="#2f2e41" d="m1592.47187,2116.28896l41.20773,0a0,0 0 0 1 0,0l0,15.92117a0,0 0 0 1 0,0l-26.32087,0a14.88686,14.88686 0 0 1 -14.88686,-14.88686l0,-1.03431a0,0 0 0 1 0,0z" />
                        <circle id="svg_19" transform="rotate(-45 -304.418 375.629)" fill="#ffb8b8" r="26.26746" cy="765.31565" cx="260.49207" />
                        <path id="svg_20" fill="#2f2e41" d="m386.37042,571.68633l-14.68181,-107.36024a3.74337,3.74337 0 0 0 -7.08033,-1.11857l-49.9688,103.64006a4.83854,4.83854 0 0 1 -5.802,2.49405l-19.25581,-6.162a4.79651,4.79651 0 0 1 -3.164,-5.89987c23.42275,-82.69648 43.64672,-144.2217 66.21384,-175.69189c0.088,-0.1222 0.17938,-0.23813 0.277,-0.352l5.00456,-5.8393a4.80484,4.80484 0 0 1 3.65413,-1.68046l36.84552,0a4.79,4.79 0 0 1 4.46877,3.02566l0.95956,2.399a5.00351,5.00351 0 0 1 0.195,0.59009c12.04415,45.84234 15.1672,106.72525 9.82817,191.60036a4.82663,4.82663 0 0 1 -4.808,4.516l-17.91755,0a4.83106,4.83106 0 0 1 -4.76825,-4.16089z" />
                        <path id="svg_21" fill="#057804" d="m351.85052,381.40815l0,0c-5.30848,-8.49524 -30.63754,-52.3814 -7.9015,-82.10429a3.80789,3.80789 0 0 0 0.76295,-1.80892l0.90132,-6.91192a4.80525,4.80525 0 0 1 5.61606,-4.11706c7.90332,1.43815 22.78958,5.96045 33.6914,20.083a4.79516,4.79516 0 0 1 0.95094,2.33739l0.60158,4.81369a3.7,3.7 0 0 0 2.152,2.93375c6.95316,3.15726 22.51306,15.46042 16.83956,61.38527a4.797,4.797 0 0 1 -4.62935,4.22882l-44.75589,1.41309c-0.05066,0.001 -0.10079,0.00209 -0.15118,0.00209a4.82162,4.82162 0 0 1 -4.07789,-2.25491z" />
                        <path id="svg_22" fill="#ffb8b8" d="m332.69945,449.79361a11.48905,11.48905 0 0 1 2.28877,-17.46779l13.374,-99.84518l23.44909,8.62565l-20.42395,95.38013a11.55132,11.55132 0 0 1 -18.68791,13.30717l0,0.00002z" />
                        <path id="svg_23" fill="#057804" d="m341.13238,344.75225a4.78022,4.78022 0 0 1 -1.13084,-4.09808l5.49732,-28.89532a4.81475,4.81475 0 0 1 4.73581,-3.91243l17.96523,0.03085a4.78746,4.78746 0 0 1 4.74818,4.07513l4.16649,26.92058a4.81188,4.81188 0 0 1 -4.418,5.53669l-27.62927,1.94491a4.786,4.786 0 0 1 -3.935,-1.60237l0.00008,0.00004z" />
                        <path id="svg_24" fill="#2f2e41" d="m341.68332,235.39119a108.9316,108.9316 0 0 0 4.30468,-18.14537c0.28713,-3.58653 -0.63165,-7.44559 -3.24355,-9.92018c-4.88806,-4.6311 -13.19292,-2.42535 -18.30473,1.95753c-7.38773,6.33426 -11.07227,16.06871 -12.46475,25.7s-0.7798,19.42538 -1.115,29.15107s-1.72617,19.72594 -6.6845,28.09949s-14.15946,14.80106 -23.86479,14.08838a16.79545,16.79545 0 0 1 -10.51373,-4.4556a12.19079,12.19079 0 0 1 -3.66134,-10.586c-4.9605,8.8824 -2.44591,20.92092 4.9531,27.90363s18.7801,8.95664 28.50715,5.97536s17.73274,-10.45674 22.51463,-19.43657s6.5342,-19.35318 6.28026,-29.52368c-0.195,-7.81015 -1.52262,-15.68424 -0.20282,-23.38454s6.139,-15.51891 13.73829,-17.33222l-0.2429,-0.0913z" />
                        <path id="svg_25" fill="#2f2e41" d="m366.24086,276.14714a13.45731,13.45731 0 0 1 5.93493,-19.4866c4.76257,-2.10788 10.27161,-1.30149 15.3828,-2.302c9.158,-1.7926 16.697,-10.15748 17.24111,-19.47335s-6.17836,-18.6266 -15.26152,-20.76614c-3.62328,-0.85346 -7.40086,-0.65265 -11.11761,-0.4469c-3.57014,0.19765 -7.14275,0.39549 -10.69511,0.80261c-7.02873,0.80553 -14.13876,2.50762 -19.98854,6.48656s-10.2671,10.56805 -10.19138,17.64238c0.08641,8.07422 3.89434,24.1472 9.1901,30.24273c5.10943,5.88105 9,8 17.10963,8.4009l2.39559,-1.10019z" />
                        <path id="svg_26" fill="#057804" d="m465.01256,373.04042l-12.33789,0l0,-12.33789a1.5,1.5 0 0 0 -3,0l0,12.33789l-12.33789,0a1.5,1.5 0 0 0 0,3l12.33789,0l0,12.33789a1.5,1.5 0 0 0 3,0l0,-12.33789l12.33789,0a1.5,1.5 0 0 0 0,-3z" />
                        <path id="svg_28" fill="#057804" d="m271.01256,237.04042l-12.33789,0l0,-12.33789a1.5,1.5 0 0 0 -3,0l0,12.33789l-12.33789,0a1.5,1.5 0 0 0 0,3l12.33789,0l0,12.33789a1.5,1.5 0 0 0 3,0l0,-12.33789l12.33789,0a1.5,1.5 0 0 0 0,-3z" />
                        <path stroke="null" id="svg_29" fill="#f2f2f2" d="m139.47002,623.72249c-0.125,0.09649 -0.25641,0.18314 -0.3827,0.27751l-107.20774,0c-2.10069,-8.50549 -2.84249,-17.02006 0.29532,-24.41432c4.47055,-10.5364 17.702,-17.11347 28.2211,-12.5887a16.06033,16.06033 0 0 1 6.30878,4.9882c4.11082,-7.35347 11.48477,-12.89776 19.99629,-12.89171c10.66356,0.00761 19.52972,8.72221 22.42291,18.78841c4.65935,-7.85913 13.86228,-13.35143 22.85728,-10.98876c15.04513,3.95168 19.79728,27.3233 7.48876,36.82937z" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default TreeSection
