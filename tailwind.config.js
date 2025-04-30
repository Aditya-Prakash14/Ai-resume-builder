/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)'
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				}
  			},
  			'loading-dot': {
  				'0%': {
  					opacity: '0.2',
  					transform: 'translateX(-2px) scale(0.8)'
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'translateX(2px) scale(1)'
  				},
  				'100%': {
  					opacity: '0.2',
  					transform: 'translateX(-2px) scale(0.8)'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			},
            'subtle-shift': {
                '0%': {
                    'background-position': '0% 0%'
                },
                '100%': {
                    'background-position': '2% 5%'
                }
            },
            'float-advanced': {
                '0%': {
                    transform: 'translateY(0px) translateX(0px) rotate(0deg)'
                },
                '25%': {
                    transform: 'translateY(-10px) translateX(5px) rotate(1deg)'
                },
                '50%': {
                    transform: 'translateY(0px) translateX(10px) rotate(0deg)'
                },
                '75%': {
                    transform: 'translateY(10px) translateX(5px) rotate(-1deg)'
                },
                '100%': {
                    transform: 'translateY(0px) translateX(0px) rotate(0deg)'
                }
            },
            'pulse-glow-advanced': {
                '0%': {
                    opacity: '0.3',
                    boxShadow: '0 0 10px rgba(149, 76, 233, 0.3), 0 0 20px rgba(149, 76, 233, 0.1)'
                },
                '50%': {
                    opacity: '0.6',
                    boxShadow: '0 0 20px rgba(149, 76, 233, 0.5), 0 0 40px rgba(149, 76, 233, 0.2)'
                },
                '100%': {
                    opacity: '0.3',
                    boxShadow: '0 0 10px rgba(149, 76, 233, 0.3), 0 0 20px rgba(149, 76, 233, 0.1)'
                }
            },
            'rotate-3d': {
                '0%': {
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
                },
                '25%': {
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)'
                },
                '50%': {
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(-6deg)'
                },
                '75%': {
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(-3deg)'
                },
                '100%': {
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
                }
            },
            'morph-blob': {
                '0%': {
                    borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
                },
                '50%': {
                    borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%'
                },
                '100%': {
                    borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
                }
            }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			blob: 'blob 8s infinite',
  			shine: 'shine var(--duration) infinite linear',
            'subtle-shift': 'subtle-shift 20s ease-in-out infinite alternate',
            'float-advanced': 'float-advanced 15s ease-in-out infinite',
            'pulse-glow-advanced': 'pulse-glow-advanced 4s ease-in-out infinite',
            'rotate-3d': 'rotate-3d 12s ease-in-out infinite',
            'morph-blob': 'morph-blob 8s ease-in-out infinite'
  		},
  		typography: {
  			xxxs: {
  				css: {
  					fontSize: '0.625rem',
  					h1: {
  						fontSize: '1rem'
  					},
  					h2: {
  						fontSize: '0.875rem'
  					},
  					h3: {
  						fontSize: '0.75rem'
  					},
  					h4: {
  						fontSize: '0.625rem'
  					}
  				}
  			},
  			xxs: {
  				css: {
  					fontSize: '0.75rem',
  					h1: {
  						fontSize: '1.25rem'
  					},
  					h2: {
  						fontSize: '1.15rem'
  					},
  					h3: {
  						fontSize: '1rem'
  					},
  					h4: {
  						fontSize: '0.875rem'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography")
  ],
};

module.exports = config;
